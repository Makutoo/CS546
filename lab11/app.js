const express = require("express")
const app = express()

const static = express.static(__dirname + "/public")
app.use("/public", static)

const configRoutes = require("./routes")
configRoutes(app)

app.listen(3000, () => {
  console.log("We've now got a server!")
  console.log("Your routes will be running on http://localhost:3000")
})