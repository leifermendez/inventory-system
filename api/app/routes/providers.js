const controller = require('../controllers/providers')
const validate = require('../controllers/providers.validate')
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
 * Cities routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['admin', 'manager']),
  trimRequest.all,
  controller.getItems
)

/*
 * Create new item route
 */
router.post(
  '/',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.createItem,
  controller.createItem
)

/*
 * Get item route
 */
router.get(
  '/:id',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['admin', 'manager']),
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
  validate.updateItem,
  controller.updateItem
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  origin.checkDomain,
  origin.checkTenant,
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
)

module.exports = router
