const model = require('../models/user')
const uuid = require('uuid')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const emailer = require('../middleware/emailer')

/*********************
 * Private functions *
 *********************/

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = async (req, tenant = null) => {
  return new Promise((resolve, reject) => {
    let use = model.byTenant(tenant);
    const user = new use({
      name: req.name,
      lastName: req.lastName,
      nie: req.nie,
      email: req.email,
      password: req.password,
      role: req.role,
      phone: req.phone,
      address: req.address,
      verification: uuid.v4()
    })
    user.save((err, item) => {
      // console.log(req)
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      // Removes properties with rest operator
      const removeProperties = ({
                                  // eslint-disable-next-line no-unused-vars
                                  password,
                                  // eslint-disable-next-line no-unused-vars
                                  blockExpires,
                                  // eslint-disable-next-line no-unused-vars
                                  loginAttempts,
                                  ...rest
                                }) => rest
      resolve(removeProperties(item.toObject()))
    })
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    res.status(200).json(await db.getItems(req, model, query))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    const tenant = req.clientAccount;
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.getItem(id, model, tenant))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
  try {
    const tenant = req.clientAccount;
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    const doesEmailExists = await emailer.emailExistsExcludingMyself(
      id,
      req.email,
      tenant
    )
    if (!doesEmailExists) {
      res.status(200).json(await db.updateItem(id, model, req, tenant))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const tenant = req.clientAccount;
    const locale = req.getLocale()
    req = matchedData(req)
    const doesEmailExists = await emailer.emailExists(req.email, tenant)
    if (!doesEmailExists) {
      const item = await createItem(req, tenant)
      emailer.sendRegistrationEmailMessage(locale, item)
      res.status(201).json(item)
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
  try {
    const tenant = req.clientAccount;
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, model, tenant))
  } catch (error) {
    utils.handleError(res, error)
  }
}
