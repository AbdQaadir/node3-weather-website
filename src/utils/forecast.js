const request = require("request");

const access_key = "da1c3e0ad72569f03d55180ee6d5a0e8";



const forecast = ({longitude, latittude}, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${latittude},${longitude}`

    request({ url, json: true }, (error, response) => {
        if(error){
            callback("Unable to conect to the weather service");
        }else if(response.body.error){
            callback("Unable to find location");
        }else{
            
            const {weather_descriptions, temperature, precip} = response.body.current;
            const { location } = response.body;

            callback(undefined, {
                weather_descriptions,
                temperature,
                precip,
                location
            });
        }
    })
}


module.exports = {
    forecast
}