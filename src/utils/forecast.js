const request = require('request')

const weatherStackInfo = (address, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=23f12664e777db66aedb00e2a45248cc&query='+encodeURIComponent(address)
    request({url:url, json:true},(error, response) => {
        if(error){
            callback('API connection error...', undefined)
        }else if(response.body.error){
            callback('Something went wrong with in put data', undefined)
        }else{
            callback(undefined,{
                City:response.body.request.query,
                temperature: response.body.current.temperature,
                whetherType:response.body.current.weather_descriptions[0]


            })
        }

    })

} 

module.exports = weatherStackInfo