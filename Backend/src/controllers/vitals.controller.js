const vitalReportModel= require("../models/vitalReport.model")


//createVitalReport

async function createVitalReportController(req,res){
    const {consultationId, bloodPressure, bodyTemperature, heartRate, oxygenLevel, weight, sugarLevel, sahayakNotes}= req.body

    if(!consultationId){
        return res.status(400).json({
            message:"Consultation id required"
        })
    }

    const vitalReport= await vitalReportModel.create({
        consultationId,
        bloodPressure,
        bodyTemperature,
        heartRate,
        oxygenLevel,
        weight,
        sugarLevel,
        sahayakNotes,
        createdBy: req.user.id
    })

    res.status(201).json({
        vitalReport,
        message: "Vital report created successfully"
    })
}

//get vital Report For Consultation

async function getVitalReportController(req,res){

    const {consultationId }= req.params

    const vitalReport= await vitalReportModel.findOne({
        consultationId
    })

    if(!vitalReport){
        return res.status(404).json({
            message: "Vital report not found"
        })
    }

    res.status(200).json({
        vitalReport
    })
}

module.exports= {
    createVitalReportController,
    getVitalReportController
}