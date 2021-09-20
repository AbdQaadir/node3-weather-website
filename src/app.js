
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");

const app = express();

const PORT = process.env.PORT || 5000,

//  Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Lateef Quadri"
    });
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About",
        name: "Lateef Quadri"
    })
});

app.get("/help", (req, res) => {
    res.render('help', {
        title: "Help",
        message: "How can we help you?",
        name: "Lateef Quadri"
    })
})

app.get("/weather", (req, res) => {

    const { location } = req.query;

    if(!location){
        return res.status(400).send({
            error: true,
            message: "You must provide an address."
        });
    }

    geocode(location, (error, response = {}) => {
        if(error){
           return res.send({
                error: true,
                message: error
            });
        }

            forecast(response, (error, response) => {
                if(error){
                    return res.send({
                         error: true,
                         message: error
                     });
                 }
                 res.send({
                     forecast: `${response.weather_descriptions[0]}. It is currently ${response.temperature} degreees out. There is a ${response.precip * 100}% chance of rain`
                    })
                //  res.send(response)
                //  res.render('index', response)
            })
        
    });
    
});

app.get("/products", (req, res) => {
    const { location } = req.query
    res.send({
        location,
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        message: "Help article not found!",
        name: "Lateef Quadri"
    });
})
app.get("*", (req, res) => {
    res.render('404', {
        title: "404 Page",
        message: "Page not found!",
        name: "Lateef Quadri",
    });
})
app.listen(PORT, () => console.log("App running on port " + PORT ))