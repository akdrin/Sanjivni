const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    role:{
        type: String,
        enum: ["Admin","Sanjivni Sahayak", "Doctor"],
        required: true
    },
    uniqueID:{
        type: String,
        unique: [true,"Already Registered"],
        required:true
    },
    password:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    }, // used to validate uniqueId
    verified:{
        type: Boolean,
        default: false
    },
    email:{
        type: String,
        unique: [true,"Email already exist"],
        required: true
    },
    phone:{
        type: String,
        unique: [true,"Phone Number already exist"],
        required: true
    },
    clinicName:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    }
},{timestamps: true})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel