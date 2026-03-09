const express= require('express')
const authMiddleware= require('../middlewares/auth.middleware')
const roleMiddleware= require('../middlewares/role.middleware')
const patientController= require('../controllers/patient.controller')

const patientRouter= express.Router()

/**
 * @route "/"
 * @description create patient by Sajivni Sahayak
 * @access private
 */

patientRouter.post("/",authMiddleware.authUser,roleMiddleware.authorizeRoles("Sanjivni Sahayak"),patientController.createPatientController)


/**
 * @route "/"
 * @description get created patients
 * @access private
 */

patientRouter.get("/",authMiddleware.authUser,roleMiddleware.authorizeRoles("Sanjivni Sahayak"),patientController.getPatientsController)

/**
 * @route "/:id"
 * @description get patient by Id
 * @access private
 */

patientRouter.get("/:id",authMiddleware.authUser,roleMiddleware.authorizeRoles("Sanjivni Sahayak"),patientController.getPatientByIdController)

module.exports= patientRouter