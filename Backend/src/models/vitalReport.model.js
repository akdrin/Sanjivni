const mongoose= require('mongoose')

const vitalReportSchema= new mongoose.Schema({
    consultationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "consultations",
        required: true,
        unique: true
    },
    bloodPressure:{
        type: {
            systolic: Number,
            diastolic: Number
        }
    },
    bodyTemperature:{
        type: Number,
        min: 30,
        max: 45
    },
    heartRate:{
        type: Number,
        min: 20,
        max: 250
    },
    oxygenLevel:{
        type: Number,
        min: 50,
        max: 100
    },
    weight:{
        type: Number
    },
    sugarLevel:{
        type: Number
    },
    sahayakNotes:{
        type: String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},{timestamps: true})

const vitalReportModel= mongoose.model("vitalReports",vitalReportSchema);

module.exports= vitalReportModel