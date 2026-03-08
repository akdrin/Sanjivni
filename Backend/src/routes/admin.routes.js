const express= require('express')
const adminController= require('../controllers/admin.controller')
const authMiddleware= require('../middlewares/auth.middleware')
const roleMiddleware= require('../middlewares/role.middleware')


const adminRouter= express.Router()

/**
 * @route /pending-users
 * @description Shows admin how many users which are not verified.
 * @access private
 */

adminRouter.get("/pending-users",authMiddleware.authUser,roleMiddleware.authorizeRoles("Admin"),adminController.getPendingUsersController)


/**
 * @route /verify-user/:id
 * @description verify users based on the unique Id by the admin
 * @access private
 */

adminRouter.patch("/verify-user/:id",authMiddleware.authUser,roleMiddleware.authorizeRoles("Admin"),adminController.verifyUserController)

/**
 * @route /reject-user/:id
 * @description reject users whose unique ID are not valid
 * @access private
 */

adminRouter.delete("/reject-user/:id",authMiddleware.authUser,roleMiddleware.authorizeRoles("Admin"),adminController.rejectUserController)


module.exports= adminRouter
