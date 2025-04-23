const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {connect} = require('mongoose')
const {PORT,DB} = require("./src/config")
const errorHanding = require("./src/middleware/errorHanding")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))


app.use(cors())
app.use(bodyParser.json())

app.use(errorHanding)

const port = PORT || 5000

app.get('/',(req,res)=>{
    return res.json({message:"server started"})
})

app.use('/api', require('./src/routes'))

const startApp = async ()=>{
    try{

        await connect(DB)

        console.log('successfully connected with the database')

        app.listen(port,()=> console.log(`servre started on port ${port}`))

    }catch(err){
        console.log(`Unable to connect with Database \n${err}`)
        startApp()
    }
}

startApp()