const model = require('../models/purchase')
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

/**
 * Get with inventory
 */
/**
 * Get with inventory
 */

const getLookList = (query = {}) => {
  return model
    .aggregate([{
      $match: query,
    },
      {
        $lookup: {
          from: 'users',
          let: {idUser: "$customer"},
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and:
                        [
                          {$eq: ["$$idUser", "$_id"]}
                        ]
                    }
                }
            }
          ],
          as: 'customer'
        }
      },
      {
        $lookup: {
          from: 'users',
          let: {idUser: "$author"},
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and:
                        [
                          {$eq: ["$$idUser", "$_id"]}
                        ]
                    }
                }
            }
          ],
          as: 'author'
        }
      },
      {$unwind: '$customer'},
      {$unwind: '$author'},
      {
        "$project": {
          "_id": 1,
          "customer": 1,
          "items": 1,
          "author": 1,
          "status": 1,
          "deliveryAddress": 1,
          "deliveryType": 1,
          "total": 1,
          "tag": 1,
          "controlNumber": 1,
          "description": 1,
          "createdAt": 1,
          "updatedAt": 1,
        }
      },
    ])
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
    const data = getLookList(query)
    res.status(200).json(await db.getItemsAggregate(req, model, data))
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
    req = matchedData(req)
    const id = await utils.isIDGood(req.id, true)
    const data = await getLookList({_id: id}).exec();
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
    const author = await utils.getUserCurrent(req)
    req = matchedData(req)
    req = {
      ...req, ...{
        author,
        customer: await utils.isIDGood(req.customer._id, true)
      }
    }
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.updateItem(id, model, req))
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
    const author = await utils.getUserCurrent(req)
    req = matchedData(req)
    req = {
      ...req, ...{
        author,
        customer: await utils.isIDGood(req.customer._id, true)
      }
    }
    res.status(201).json(await db.createItem(req, model))
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
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}
