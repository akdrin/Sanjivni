const mongoose= require('mongoose')

const consultationSchema= new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients",
        required: true
    },
    sahayakId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    requiredSpecialization:{
        type: String,
        enum: ["GENERAL","E&T","ORTHO","NEURO","DERMA","GYNAE"],
        required: true
    },
    chiefComplaint:{
        type: String,
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
    notesForSahayak:{
        type: String,
        required: true
    }
},{timestamps: true})

const consultationModel= mongoose.model("consultations",consultationSchema)

module.exports= consultationModel
