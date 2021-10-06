
require("dotenv").config(); 
const express = require("express"); 
const morgan = require("morgan"); 
const methodOverride = require("method-override");
const AnimalRouter = require("./controllers/animals");

const app = express()

//Middleware
app.use(morgan("tiny")) 
app.use(methodOverride("_method")) 
app.use(express.urlencoded({extended: true})) 
app.use(express.static("public"))
app.use("/animals", AnimalRouter) 


app.get("/", (req, res) => {
    res.send("Server is working")
})



//Port for server
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
