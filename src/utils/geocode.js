const request = require('request')

const geoCode = (address, callback) =>{
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmlzaGFsNDkwIiwiYSI6ImNrbG44NW4waTBnZXIyd3A0cG5rNjB2NGIifQ.H35fsBdNZyem3Vl_x_nYLw&limt=1'
    request({url:geoUrl, json:true},(error, response) => {
        if(error){
            callback('API connection error...', undefined)
        }else if (response.body.features.length<=0){
            callback(undefined, {
                invalidLoc:true})
        }else{
    
            const data = response.body.features[0].center
            // console.log(data)
            // console.log(`latitue ${data[0]} and Longitude ${data[1]}`)
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode