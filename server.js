const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const dbConnection = require('./db')
const path = require('path')
require('dotenv').config({path:"./config.env"});







// module.exports = mongoose

app.use(express.json())

app.use('/api/cars/' , require('./routes/carsRoute'))
app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/bookings/' , require('./routes/bookingsRoute'))


const __dirname1=path.resolve()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1 , '/client/build')));
    app.get('/' , (req,res)=> {
        req.sendfile(path.join(__dirname1 , 'client','build','index.html'));
    })

}else{
    app.get("/",(req,res)=>{
        res.send("Api running")
    })
}


const path = require('path')

if(process.env.NODE_ENV==='production')
{

    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}

app.get('/', (req, res) => res.send('Hello World!'))


 


app.listen(PORT, () => console.log(`Node JS Server Started in Port ${PORT}`))