const express= require('express')

const prescriptionRouter= express.Router()
const prescriptionController= require("../controllers/doctorPrescriptions.controller")

const authMiddleware= require('../middlewares/auth.middleware')
const roleMiddleware= require('../middlewares/role.middleware')

/**
 * @route "/"
 * @description create prescription by doctor
 * @access private
 */

prescriptionRouter.post("/",authMiddleware.authUser, roleMiddleware.authorizeRoles("Doctor"), prescriptionController.createPrescriptionController)

/**
 * @route "/:consultationId"
 * @description get prescription provided by doctor based on consultation id
 * @access private
 */

prescriptionRouter.get("/:consultationId",authMiddleware.authUser, prescriptionController.getPrescriptionController)

module.exports= prescriptionRouter
