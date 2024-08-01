


const dotenv = require("dotenv")
dotenv.config() 
const express = require("express")
const mongoose = require("mongoose")
const Car = require("./models/car.js")
const app = express()
const methodOverride = require("method-override")
const morgan = require("morgan")

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
  })


app.get("/", async (req, res) => {
    res.render("index.ejs")
  })

  app.get("/cars", async (req, res) => {
    const allCars = await Car.find()
    console.log(allCars)
    res.render("cars/index.ejs", {cars: allCars})
  })
  
app.get("/cars/new", (req, res) => {
    res.render("cars/new.ejs")
  })

  app.get("/cars/:carId", async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render("cars/show.ejs", {car: foundCar})
  })
  

  app.post("/cars", async (req, res) => {
    if (req.body.sports === "on") {
      req.body.sports = true;
    } else {
      req.body.sports = false;
    }
    await Car.create(req.body)
    res.redirect("/cars")
    console.log(req.body)
  })
    
  
  app.delete("/cars/:carId", async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId)
    res.redirect("/cars")
  })


  app.get("/cars/:carId/edit", async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render("cars/edit.ejs", {car: foundCar })
  })

  app.put("/cars/:carId", async (req, res) => {

    if (req.body.sports === "on") {
      req.body.sports = true;
    } else {
      req.body.sports = false;
    }
  
await Car.findByIdAndUpdate(req.params.carId, req.body)

res.redirect(`/cars/${req.params.carId}`)
})





app.listen(3208, () => {
  console.log("Listening on port 3107");
});
