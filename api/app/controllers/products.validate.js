const {validationResult} = require('../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
exports.createItem = [
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('prices')
    .exists(),
  check('measures')
    .exists(),
  check('categories')
    .exists(),
  check('tag')
    .exists(),
  check('gallery')
    .exists(),
  check('sku')
    .exists(),
  check('description')
    .optional(),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates update item request
 */
exports.updateItem = [
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('prices')
    .exists()
    .not()
    .isEmpty(),
  check('measures')
    .exists(),
  check('categories')
    .exists(),
  check('tag')
    .exists(),
  check('gallery')
    .exists(),
  check('sku')
    .exists(),
  check('description')
    .optional(),
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates get item request
 */
exports.getItem = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates delete item request
 */
exports.deleteItem = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]
