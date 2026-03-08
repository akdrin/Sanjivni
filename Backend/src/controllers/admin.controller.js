const userModel= require('../models/user.model')


// getPendingUsersController 

async function getPendingUsersController(req,res){
    const users= await userModel.find({
        verified: false,
        role: {$ne: "Admin"}
    }).select("-password")

    if(users.length== 0){
        return res.status(404).json({
            message: "No pending users."
        })
    }
    return res.status(200).json({
        users,
        message: "Pending users fetched successfully."
    })

}


// verifyUserController

async function verifyUserController(req,res){
    const {id}= req.params

    const user= await userModel.findByIdAndUpdate(id,{verified: true},{new: true}).select("-password")

    if(!user){
        return res.status(404).json({
            message:"User Not found"
        })
    }
    return res.status(200).json({
        user,
        message: "User verified successfully."
    })

}


//rejectUserController

async function rejectUserController(req,res){
    const {id}= req.params
    
    const user= await userModel.findByIdAndDelete(id)

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    return res.status(200).json({
        message:"User rejected and deleted"
    })
}


module.exports={
    getPendingUsersController,
    verifyUserController,
    rejectUserController
}