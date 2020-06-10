const controller = require('../controllers/profile')
const validate = require('../controllers/profile.validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const origin = require('../middleware/origin')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Profile routes
 */

/*
 * Get profile route
 */
router.get(
  '/',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['customer', 'admin', 'manager','user']),
  trimRequest.all,
  controller.getProfile
)

/*
 * Update profile route
 */
router.patch(
  '/',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['customer', 'admin', 'manager','user']),
  trimRequest.all,
  validate.updateProfile,
  controller.updateProfile
)

/*
 * Change password route
 */
router.post(
  '/changePassword',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['customer', 'admin', 'manager','user']),
  trimRequest.all,
  validate.changePassword,
  controller.changePassword
)

module.exports = router
