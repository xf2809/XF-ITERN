const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jobDetailRouter = require("./router/jobDetailRouter");
const adminRouter = require("./router/adminRouter");
const adminPostRouter = require("./router/adminPostRouter");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require("cloudinary").v2;
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin:["https://xfintern.onrender.com","http://localhost:5173","http://localhost:5000","*"],
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"], 
  credentials:true
}));


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// console.log(cloudinary.config())
cloudinary.config({
  secure: true
});



app.use(bodyParser.json());
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
app.use('/api/v1',jobDetailRouter);
app.use('/api/admin',adminRouter);
app.use('/api/post',adminPostRouter);

app.get('/',(req,res)=>{
    res.send("Heellooo!!!!");
})

module.exports = app;
