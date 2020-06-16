const controller = require('../controllers/settings')
const validate = require('../controllers/settings.validate')
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
 * Get item route
 */
router.get(
  '/',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['customer', 'admin', 'manager', 'seller', 'user']),
  trimRequest.all,
  validate.getItem,
  controller.getItem
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  controller.upload.single('logo'),
  controller.updateItem
)

module.exports = router
