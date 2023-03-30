const mongoose =require('mongoose')
const Artisan =require("../models/artisan")
const bcrypt =require("bcrypt")
const fs =require("fs")
const multer=require("multer")
const path =require("path")
const session = require('express-session')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    },
})
const upload =multer({storage:storage})
const signup =(req,res)=>{
    
    res.render("artisan/form.ejs")
}

const Login =(req,res)=>{
    res.render("artisan/login.ejs")
}
const artisanDashboard = (req, res) => {
    res.render("artisan/index.ejs")
}
const Reg = (req, res) => {
    const { contact_name, phone, email, business_name, cacstatus, address, city, website_url, username, password} = req.body
    const merchant = new Artisan({
        contact_name, phone, email, business_name, cacstatus, address,
        city, website_url, username, password, avatar:req.file.filename

    })
    if (!merchant) {
        req.flash("error_msg", "please fill all the required field")
        res.redirect("/signup")
    }
    merchant.save()
    req.flash("message","data successfully captured")
    res.redirect("/login")

}
const login = async (req, res) => {
    try {
        const artisan =  await Artisan.findByCredentials( req.body.username,req.body.password )
        req.flash("message", "successfully login ")
        res.redirect("/index")
    }
    catch {
        res.status(500).send("UNABLE TO LOGIN")
    }
    
}
module.exports =({Reg,signup,Login,login,artisanDashboard,upload})