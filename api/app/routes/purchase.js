const controller = require('../controllers/purchase')
const validate = require('../controllers/purchase.validate')
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
 * Cities routes
 */

/*
 * Get all items route
 */
// router.get('/all', controller.getAllItems)

/*
 * Get items route
 */
router.get(
  '/',
  origin.checkDomain,
  requireAuth,
  AuthController.roleAuthorization(['customer', 'admin', 'manager', 'seller']),
  trimRequest.all,
  controller.getItems
)

/*
 * Create new item route
 */
router.post(
  '/',
  origin.checkDomain,
  requireAuth,
  AuthController.roleAuthorization(['admin', 'manager', 'seller']),
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
  requireAuth,
  AuthController.roleAuthorization(['admin', 'manager', 'seller']),
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
  requireAuth,
  AuthController.roleAuthorization(['admin', 'manager', 'seller']),
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
  requireAuth,
  AuthController.roleAuthorization(['admin', 'manager', 'seller']),
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
)

module.exports = router
