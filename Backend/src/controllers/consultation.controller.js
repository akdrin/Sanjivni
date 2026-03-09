const consultationModel= require('../models/consultation.model')
const userModel= require('../models/user.model')


//create Consultation

async function createConsultationController(req,res){

    const {patientId, requiredSpecialization, chiefComplaint, symptoms, notesForSahayak}= req.body
    if(!patientId || !requiredSpecialization || !chiefComplaint || !symptoms || !notesForSahayak){
        return res.status(400).json({
            message:"Please provide required details."
        })
    }

    const consultation= await consultationModel.create({
        patientId,
        sahayakId: req.user.id,
        requiredSpecialization,
        chiefComplaint,
        symptoms,
        notesForSahayak,
        status: "PENDING"
    })

    res.status(201).json({
        consultation,
        message:"Consultation created sucessfully"
    })
}   

// get consultations created by sahayak

async function getSahayakConsultationsController(req, res){

    const consultations= await consultationModel.find({
        sahayakId: req.user.id
    }).populate("patientId")

    req.status(200).json({
        consultations,
        message:"Consultations fetched sucessfully"
    })
}


// get consultation available for doctors

async function getAvailableConsultationsController(req,res){

    const doctor= await userModel.findById(req.user.id)

    const consultations= await consultationModel.find({
        requiredSpecialization: doctor.specialization,
        status: "PENDING"
    }).populate("patientId")

    req.status(200).json({
        consultations,
        message:"Consultations fetched sucessfully"
    })
}


// doctor accepts consultation

async function acceptConsultationController(req,res){
    const {id}= req.params

    const consultation= await consultationModel.findByIdAndUpdate(id,{
        doctorId: req.user.id,
        status: "IN_PROGRESS"
    },{new: true})

    if(!consultation){
        return res.status(404).json({
            message: "Consultation not found"
        })
    }
    res.status(200).json({
        consultation,
        message: "Consultation accepted successfully"
    })
}

// get consultation details

async function getConsultationByIdController(req,res){

    const {id}= req.params

    const consultation= await consultationModel.findById(id).populate("patientId").populate("sahayakId").populate("doctorId")

    if(!consultation){
        return res.status(404).json({
            message:"Consultation not found."
        })
    }

    return res.status(200).json({
        consultation,
        message: "Consultation fetched successfully."
    })
}

module.exports= {
    createConsultationController,
    getSahayakConsultationsController,
    getAvailableConsultationsController,
    acceptConsultationController,
    getConsultationByIdController
}