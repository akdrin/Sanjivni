const docotorPrescriptionModel= require("../models/doctorPrescriptions.model")
const consultationModel= require("../models/consultation.model")


// create prescription 

async function createPrescriptionController(req,res){

    const { consultationId, diagnosis, medicines, additionalTests, doctorNotes}= req.body

    if(!consultationId || !diagnosis){
        return res.status(400).json({
            message: "Consultation id and diagnosis required"
        })
    }

    const prescription= await docotorPrescriptionModel.create({
        consultationId,
        diagnosis,
        medicines,
        additionalTests,
        doctorNotes,
        createdBy: req.user.id
    })

    await consultationModel.findByIdAndUpdate(
        consultationId,
        {
            status: "COMPLETED"
        }
    )

    req.status(201).json({
        prescription,
        message: "Prescription created successfully"
    })
}

//get prescription 

async function getPrescriptionController(req,res){

    const { consultationId }= req.params
    const prescription= await doctorPrescriptionModel.findOne({consultationId})

    if(!prescription){
        return res.status(404).json({
            message: "Prescription not found."
        })
    }

    res.status(200).json({
        prescription
    })
}


module.exports= {
    createPrescriptionController,
    getPrescriptionController
}