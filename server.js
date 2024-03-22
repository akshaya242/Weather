// Server-side code

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 3000;

// Define the getTemperatureIcon() function
function getTemperatureIcon(temperature) {
    if (temperature < 0) {
        return "images/icons8-snowflake-48.png";
    } else if (temperature >= 0 && temperature < 10) {
        return "images/icons8-rain-64.png";
    } else if (temperature >= 10 && temperature < 20) {
        return "images/icons8-cloud-sun-64.png";
    } else if (temperature >= 20 && temperature < 30) {
        return "images/icons8-sun-48.png";
    } else {
        return "images/hot-temperature_4168782.png";
    }
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs", {
        result: null
    });
})

app.post("/", async(req, res)=>{
    const { city } = req.body
    const apiKey = "fd66bb9a0f5e8b6dd812631f4ee4dde2";
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    
    try {
        const response = await axios.get(baseUrl);
        const detail = response.data;
        res.render("index.ejs", {
            result: detail,
            temperature: detail.main.temp
        });
    } catch(error) {
        console.log("error");
    }
});

app.listen(PORT, () => {
    console.log("The server is listening to port: " + PORT);
});
