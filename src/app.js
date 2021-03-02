const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)




app.use(express.static(publicDirectory))

app.get('',(req, res) => {
    

    res.render('index',{
        title:'Weather App',
        create:'Created By Vishal'
    })
})

app.get('/about',(req, res) => {

    res.render('about',{
        title:'About',
        create:'Created By Vishal'
    })
})


app.get('/help',(req, res) => {

    res.render('help',{
        title:'Help',
        create:'Created By Vishal'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address){

        return res.send({
            error:'Please provide the correct city name'
        })
    }else{
        let address =req.query.address
        geocode(address, (error, data) =>{
            
        if(error){
            return console.log(error)
        }else if(data.invalidLoc){
            //console.log('Inavlida City name....')
            return res.send({userInfo:'Invalid City Name....!!', invalidLocation:true})
        }
        console.log('From Gecode...',data)
        forecast(data.location,(error, forecastdata) =>{
            if(error){
                return console.log(error)
            }
            console.log('Error', error)
            console.log('Data', forecastdata)

            res.send({
                weatherInfo:forecastdata
                
            })
        
        })

        })

    }
    
})
app.get('/help/*', (req, res) =>{
    
    res.render('pageNotFound',{
        create:'Created By Vishal',
        errorMsg:'Help Artical not found.....'
    })
})



app.get('*', (req, res) =>{
    
    res.render('pageNotFound',{
        create:'Created By Vishal',
        errorMsg:'Page Not found 404 Error'
    })
})

app.listen(3000,() =>{
    console.log('Server is up on port 3000')
})