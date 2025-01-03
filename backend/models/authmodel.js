const mongoose=require('mongoose');


const authSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:true,
    }
})

const Authenticate=mongoose.model('ketoauth',authSchema)

module.exports= Authenticate