const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        require:true,
        min:6,
        type:String,
        max:255
    },
    email:{
        require:true,
        min:6,
        type:String,
        max:255
    },
    password:{
        require:true,
        min:6,
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('User',userSchema)