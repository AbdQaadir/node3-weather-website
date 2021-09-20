const request = require('request');

const mapbox_token = "pk.eyJ1IjoiYWJkcWFhZGlyIiwiYSI6ImNrdGpiaGlheTBpcWIydnFuM2JibHdpcDMifQ.WV_qhnvT_PKkuuhwxX-atQ";

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapbox_token}&limit=1`;

    request({url, json: true}, (error, response) => {
        if(error){
            callback("Unable to conect to location services.")
        }else if(response.body.features.length === 0){
            callback("Unable to find location. Try another search.");
        }else{
            const [latittude, longitude] = response.body.features[0].center;
            const location = response.body.features[0].place_name
            callback(undefined, {longitude, latittude, location});
        }
    })
};



module.exports = {
    geocode
}
