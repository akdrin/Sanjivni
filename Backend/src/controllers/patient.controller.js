const patientModel= require('../models/patient.model')


//createPatientController

async function createPatientController(req,res){
    const {name, age, gender, phone, address}= req.body
    
    if(!name || !age || !gender || !phone || !address){
        return res.status(400).json({
            message:"Please provide all details"
        })
    }

    const patient= await patientModel.create({
        name,
        age,
        gender,
        phone,
        address,
        createdBySahayak: req.user.id
    })

    res.status(201).json({
        patient,
        message:"Patient created Successfully."
    })
}

//getPatientsController

async function getPatientsController(req,res){
    const patients= await patientModel.find({
        createdBySahayak: req.user.id
    })

    return res.status(200).json({
        patients,
        message:"Patients fetched successfully."
    })
}

//getPatientByIdController

async function getPatientByIdController(req,res){
    const {id}= req.params
    const patient= await patientModel.findById(id)

    if(!patient){
        return res.status(400).json({
            message:"Patient not found"
        })
    }
    return res.status(200).json({
        patient,
        message:"Patient fetched sucessfully"
    })
}


module.exports= {
    createPatientController,
    getPatientsController,
    getPatientByIdController
}