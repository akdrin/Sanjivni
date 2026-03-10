const express= require('express')

const vitalRouter= express.Router()

const vitalController= require("../controllers/vitals.controller")
const authMiddleware= require("../middlewares/auth.middleware")
const roleMiddleware= require("../middlewares/role.middleware")

/**
 * @route "/"
 * @description "Create vital report by sanjivni sahayak"
 * @access private
 */

vitalRouter.post("/", authMiddleware.authUser, roleMiddleware.authorizeRoles("Sanjivni Sahayak"), vitalController.createVitalReportController)

/**
 * @route "/:consultationId"
 * @description "Get vital report by consultation id "
 * @access private
 */

vitalRouter.post("/:consultationId", authMiddleware.authUser, vitalController.getVitalReportController)

module.exports= vitalRouter