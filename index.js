require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const {form} = require('./models/user')
const { read } = require('fs')
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected suceesfully')
})

const app = express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Server running on port ${process.env.PORT || 3000}`);
});
app.get("/",(req,res)=>{
    return res.redirect("/users")
})
app.get("/users",(req,res)=>{
    res.render("home.ejs")
})
app.get("/users/register",(req,res)=>{
    res.render("registration.ejs")
})
app.get("/users/login",(req,res)=>{
    res.render("login.ejs")
})
app.post("/users/register",(req,res)=>{
    let {name,email,password} = req.body;
    let newuser = new form({name:name,email:email,password:password})
    newuser.save()
    res.render("welcome.ejs")
})
app.post("/users/login",(req,res)=>{
    let {email:ene,password:enp} = req.body;
    res.redirect("/users/welcome");
})
app.get("/users/welcome",(req,res)=>{
    res.render("welcome.ejs")
})