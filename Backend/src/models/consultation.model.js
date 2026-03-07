const mongoose= require('mongoose')

const consultationSchema= new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients",
        required: true
    },
    chemistId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status:{
        type: String,
        enum: ["PENDING","DOCTOR_ASSIGNED","IN_PROGRESS","COMPLETED"],
        default: "PENDING"
    },
    symptoms:{
        type: String,
        required: true
    },
    notesForChemist:{
        type: String,
        required: true
    }
},{timestamps: true})

const consultationModel= mongoose.model("consultations",consultationSchema)

module.exports= consultationModel
