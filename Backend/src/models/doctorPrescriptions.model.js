const mongoose= require('mongoose')

const doctorPrescriptionSchema= new mongoose.Schema({
    consultationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "consultations",
        required: true,
        unique: true
    },
    diagnosis:{
        type: String,
        required: true
    },
    medicines:[
        {
        name:{
            type:String,
            required:true
        },
        dosage:{
            type:String,
            required:true
        },
        frequency:{
            type:String
        },
        duration:{
            type:String,
            required:true
        }
        }
    ],
    additionalTests: [String],
    doctorNotes:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},{timestamps: true})

const doctorPrescriptionModel= mongoose.model("doctorPrescriptions",doctorPrescriptionSchema)

module.exports= doctorPrescriptionModel