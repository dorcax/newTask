const mongoose = require("mongoose")
const bcrypt =require("bcrypt")
const artisanSchema =new mongoose.Schema({
    contact_name:{
        type:String,
        required:true

    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        },
    business_name:{
        type:String,
        required:true
    },
    cacstatus:{
        type:String,
        required:true
    },
    address:{
            type:String,
            required:true
        },
   
    city:{
        type:String,
        required:true
    },
    website_url:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar: {
        type: Buffer,
        // required:true
        
        
    },
    dateRegistered:{
            type:Date,
            default:Date.now()
        }
})

artisanSchema.statics.findByCredentials = async(username,password) => {
    const artisan =  await Artisan.findOne({username})
    
        if (!artisan) {
            throw new Error ("unable to login")
        }
        const isMatch = await bcrypt.compare(password,artisan.password)
        if (!isMatch) {
            throw new Error ("unable to login")
            
    }
     return artisan
}
// hashing of password
artisanSchema.pre("save", async function (next) {
    const artisan = this
    if (artisan.isModified("password")) {
        artisan.password =await bcrypt.hash(artisan.password,10)
    }
    next()
    
})
const Artisan =mongoose.model('Artisan',artisanSchema)
module.exports=Artisan