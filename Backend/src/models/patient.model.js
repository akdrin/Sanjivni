const mongoose= require('mongoose')

const patientSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    createdByChemist:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    }
},{timestamps: true})

const patientModel= mongoose.model("patients",patientSchema)

module.exports= patientModel