const model = require('../models/purchase')
const modelInventory = require('../models/inventory')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const AuthController = require('../controllers/auth')
const mongoose = require('mongoose')
const moment = require('moment')
/*********************
 * Private functions *
 *********************/
/**
 * Use in model
 */
const insideCreate = async (data, tenant = null) => {
  try {

    const authorId = await utils.isIDGood(data.author, true);
    const author = await AuthController.findUserById(authorId, tenant);
    let inventory = data.items.map((item) => {
        return {
          product: {
            ...item, ...{
              _id: mongoose.Types.ObjectId(item._id),
              id: null
            }
          },
          provider: null,
          qty: (Math.abs(item.qty) * -1),
          deposit: null,
          author,
          purchase: mongoose.Types.ObjectId(data.id),
          createdAt: moment().toDate(),
          updatedAt: moment().toDate(),
          deleted: false,
          deletedAt: null
        };
      }
    )
    modelInventory.byTenant(tenant).remove({
      purchase: mongoose.Types.ObjectId(data.id),
    }, (err, item) => {
      if (!err) {
        modelInventory.byTenant(tenant).insertMany(inventory)
      }
    })

  } catch (e) {
    console.log(e)
    return null
  }
}
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
    const tenant = req.clientAccount;
    const query = await db.checkQueryString(req.query)
    const data = db.getLookListPurchases(model, query, tenant)
    res.status(200).json(await db.getItemsAggregate(req, model, data, tenant))
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
    const id = await utils.isIDGood(req.id, true)
    const data = await db.getLookListPurchases(model, {_id: id}, tenant).exec();
    res.status(200).json(data.find(a => true))
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
    const author = await utils.getUserCurrent(req)
    req = matchedData(req)
    req = {
      ...req, ...{
        author,
        customer: await utils.isIDGood(req.customer._id, true)
      }
    }
    await insideCreate(req, tenant)
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
    const author = await utils.getUserCurrent(req)
    req = matchedData(req)
    req = {
      ...req, ...{
        author,
        customer: await utils.isIDGood(req.customer._id, true)
      }
    }

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
