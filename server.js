
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

const app = express()

//Animal Schema
const {Schema, model} = mongoose

const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

const Animal = model("Animal", animalSchema)

//Seed route
app.get("/animals/seed", (req, res) => {

    const startAnimals = [
          { species: "Gorilla", extinct: false, location: "Central Africa", lifeExpectancy: 35},
          { species: "Honey Badger", extinct: false, location: "Western Asia and Africa", lifeExpectancy: 24},
          { species: "Dog", extinct: false, location: "Around the globe", lifeExpectancy: 12},
          { species: "Jaguar", extinct: false, location: "South and Central America", lifeExpectancy: 15},
          { species: "Koala", extinct: false, location: "Australia", lifeExpectancy: 14},
          { species: "Grizzly Bear", extinct: false, location: "South and Western Canada/North-west America", lifeExpectancy: 30},
          { species: "Megalodon", extinct: true, location: "Every continent except Antarctica", lifeExpectancy: 88},
        ]
  
    Animal.deleteMany({}, (err, data) => {
 
      Animal.create(startAnimals,(err, data) => {
          res.json(data);
        }
      );
    });
  });

//Middleware
app.use(morgan("tiny")) 
app.use(methodOverride("_method")) 
app.use(express.urlencoded({extended: true})) 
app.use(express.static("public")) 


app.get("/", (req, res) => {
    res.send("Server is working")
})

// index route
app.get("/animals", async (req, res) => {
    const animals = await Animal.find({});
    res.render("animals/index.ejs", { animals });
  });

  // edit route
app.get("/animals/:id/edit", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
        res.render("animals/edit.ejs", {animal})
    })
})

//update route
app.put("/animals/:id", (req, res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
        res.redirect("/animals")
    })
})

// new route
app.get("/animals/new", (req, res) => {
    res.render("animals/new.ejs")
})

// create route
app.post("/animals", (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.create(req.body, (err, animal) => { 
        res.redirect("/animals")
    })
})

app.delete("/animals/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, animal) => {
        res.redirect("/animals")
    })
})

  // show route
app.get("/animals/:id", (req, res) => { 
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
       res.render("animals/show.ejs", {animal})
    })
})

//Port for server
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
