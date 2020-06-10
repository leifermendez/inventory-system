const controller = require('../controllers/auth')
const validate = require('../controllers/auth.validate')
const AuthController = require('../controllers/auth')
const origin = require('../middleware/origin')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post(
  '/register',
  origin.checkDomain,
  trimRequest.all,
  validate.register,
  controller.register
)

/*
 * Verify route
 */
router.post('/verify',
  origin.checkDomain,
  trimRequest.all, validate.verify, controller.verify)

/*
 * Forgot password route
 */
router.post(
  '/forgot',
  origin.checkDomain,
  trimRequest.all,
  validate.forgotPassword,
  controller.forgotPassword
)

/*
 * Reset password route
 */
router.post(
  '/reset',
  origin.checkDomain,
  trimRequest.all,
  validate.resetPassword,
  controller.resetPassword
)

/*
 * Get new refresh token
 */
router.get(
  '/token',
  origin.checkDomain,
  requireAuth,
  AuthController.roleAuthorization(['customer', 'admin', 'manager','user']),
  trimRequest.all,
  controller.getRefreshToken
)

/*
 * Login route
 */
router.post('/login',
  origin.checkDomain,
  trimRequest.all,
  validate.login,
  controller.login)

module.exports = router
