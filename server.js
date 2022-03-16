// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(3000,()=>{
    console.log('server start listing on port 3000')
})


// post route to store data in the serever
app.post("/addData", (req, res)=>{
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    console.log(projectData)
    res.send(projectData);
})
// get route to get the stored data 
app.get("/allData", (req, res)=>{
    res.send(projectData)
})