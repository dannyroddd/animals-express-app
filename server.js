
//Dependencies 
require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const methodOverride = require("method-override")
const mongoose = require("mongoose")

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

//Connection
mongoose.connect(DATABASE_URL, CONFIG)

//in case of errors /logs if connected correctly
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


//Animal Schema
const {Schema, model} = mongoose

const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

const Animal = model("Animal", animalSchema)

const app = express()

//Middleware
app.use(morgan("tiny")) 
app.use(methodOverride("_method")) 
app.use(express.urlencoded({extended: true})) 
app.use(express.static("public")) 


app.get("/", (req, res) => {
    res.send("Server is working")
})


//Port for server
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
