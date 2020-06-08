const model = require('../models/providers')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/*********************
 * Private functions *
 *********************/
/**
 * Gets all items from database
 */
const getAllItemsFromDB = async () => {
  return new Promise((resolve, reject) => {
    model.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          name: 1
        }
      },
      (err, items) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllItems = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromDB())
  } catch (error) {
    utils.handleError(res, error)
  }
}

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
    res.status(200).json(await db.updateItem(id, model, req, tenant))
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
    const tenant = req.clientAccount;
    req = matchedData(req)
    res.status(201).json(await db.createItem(req, model, tenant))
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
