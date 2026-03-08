const userModel= require('../models/user.model')
const tokenblacklistModel=require('../models/blacklist.model')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

/**
 * @name registerUserController
 * @description Register a new User,expects username,email and password
 * @access Public
 */

async function registerUserController(req,res){
    const {name, role, uniqueID, password, email, phone, clinicName, address, state}= req.body

    if(!name || !role || !uniqueID || !password || !email || !phone || !clinicName || ! address || !state){
        return res.status(400).json({
            message: "Please provide all details"
        })
    }

    const isUserAlreadyExist= await userModel.findOne({
        $or: [{uniqueID},{email},{phone}]
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "Account already exist with this uniqueID , email or Phone no"
        })
    }
    const hash= await bcrypt.hash(password,10)

    const user= await userModel.create({
        name,
        role,
        uniqueID,
        email,
        phone,
        clinicName,
        address,
        state,
        password: hash,
        verified: false
    })

    res.status(201).json({
        message: "User registered sucessfully, Waiting for verification",
        user: {
            id: user._id,
            name: user.name,
            role: user.role,
            uniqueID: user.uniqueID,
            email: user.email,
            phone: user.phone,
            clinicName: user.clinicName,
            address: user.address,
            state: user.state
        }
    })
}

/**
 * @name loginUserController
 * @description Login a user,expects Username and password in the req body
 * @access Public
 */

async function loginUserController(req,res){
    const {uniqueID, password} =req.body
    const user=await userModel.findOne({uniqueID})
    if(!user){
        return res.status(400).json({
            message: "Invalid ID"
        })
    }

    const isPasswordValid= await bcrypt.compare(password , user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid ID or Password"
        })
    }

    if(!user.verified){
        return res.status(403).json({
            message:"Account not verified yet"
        })
    }
    const token = jwt.sign(
        {id: user._id,uniqueID: user.uniqueID, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.cookie("token",token)
    res.status(200).json({
        message:"User LoggedIn sucessfully",
        user:{
            id: user._id,
            name: user.name,
            role: user.role,
            uniqueID: user.uniqueID,
            email: user.email,
            phone: user.phone,
            clinicName: user.clinicName,
            address: user.address,
            state: user.state
        }
    })
}

/**
 * 
 * @name logoutUserController
 * @description remove token from cookie and add to blacklist
 * @access public
 */

async function logoutUserController(req,res){
    const token= req.cookies.token
    if(token){
        await tokenblacklistModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out successfully"
    })
}

/**
 * 
 * @name getMeController
 * @description get the current logged in user details
 * @access private
 */
async function getMeController(req,res){
    const user= await userModel.findById(req.user.id).select("-password")
    res.status(200).json({
        message:"User details fetched sucessfully",
        user:{
            id: user._id,
            name: user.name,
            role: user.role,
            uniqueID: user.uniqueID,
            email: user.email,
            phone: user.phone,
            clinicName: user.clinicName,
            address: user.address,
            state: user.state
        }
    })
}
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}