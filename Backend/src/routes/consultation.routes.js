const express= require("express")

const consultationRouter= express.Router()
const consultationController= require("../controllers/consultation.controller")

const authMiddleware= require("../middlewares/auth.middleware")
const roleMiddleware= require("../middlewares/role.middleware")

/**
 * @route "/"
 * @description create consultation by Sanjivni Sahayak
 * @access private
 */

consultationRouter.post("/",authMiddleware.authUser,roleMiddleware.authorizeRoles("Sanjivni Sahayak"), consultationController.createConsultationController)


/**
 * @route "/sahayak"
 * @description get all consultations created by Sanjivni Sahayak
 * @access private
 */

consultationRouter.get("/sahayak",authMiddleware.authUser,roleMiddleware.authorizeRoles("Sanjivni Sahayak"), consultationController.getSahayakConsultationsController)


/**
 * @route "/available"
 * @description get all available consultation by Doctor.
 * @access private
 */

consultationRouter.get("/available",authMiddleware.authUser,roleMiddleware.authorizeRoles("Doctor"), consultationController.getAvailableConsultationsController)

/**
 * @route "/accept/:id"
 * @description accepting consultation by Doctor
 * @access private
 */

consultationRouter.patch("/accept/:id",authMiddleware.authUser, roleMiddleware.authorizeRoles("Doctor"), consultationController.acceptConsultationController)

/**
 * @route "/:id"
 * @description get Consultation details by Id
 * @access private
 */

consultationRouter.get("/:id",authMiddleware.authUser, consultationController.getConsultationByIdController)

module.exports= consultationController
