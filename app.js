const express =require("express")
const session =require("express-session")
const mongoose = require("mongoose")
const ejs =require("ejs")
const flash =require("connect-flash")
const app =express()
mongoose.connect("mongodb://localhost:27017/marketplaceDB",{useNewUrlParser:true})
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
   }))
  
//    connect flash

app.use(flash()) 
app.use((req,res,next)=>{
    res.locals.message =req.flash("message")
    res.locals.error_msg =req.flash("error_msg")
    next();
    
})



app.get("/",(req,res)=>{
    res.render("artisan/index.ejs")
})
app.use("/",require("./routes/aroute"))
// app.use("/",require("./route/mroute"))




app.listen(3000,()=>{
    console.log('app currently running on port 3000')
})