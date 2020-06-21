const model = require('../models/products')
const {matchedData} = require('express-validator')
const auth = require('../middleware/auth')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/*********************
 * Private functions *
 *********************/
/**
 * Gets all items from database
 */
const getAllItemsFromDB = async (tenant = null) => {
  return new Promise((resolve, reject) => {
    model
      .byTenant(tenant)
      .find(
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
    const data = db.getLookListProducts(model, query, tenant)
    res.status(200).json(await db.getItemsAggregate(req, model, data, tenant))
    // res.status(200).json(await db.getItems(req, model, query))
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
    const id = await utils.isIDGood(req.id, true);
    const aggregate = [
      {
        $match: {_id: id}
      },
      {
        $lookup: {
          from: 'inventories',
          let: {idProduct: "$_id"},
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and:
                        [
                          {$eq: ["$$idProduct", "$product._id"]}
                        ]
                    }
                }
            }
          ],
          as: 'provider'
        }
      },
      {
        "$project": {
          "_id": 1,
          "name": 1,
          "prices": 1,
          "author": 1,
          "measures": 1,
          "categories": 1,
          "tag": 1,
          "gallery": 1,
          "sku": 1,
          "description": 1,
          "createdAt": 1,
          "updatedAt": 1,
          "provider":1
        }
      },
    ]
    res.status(200).json(await db.getItemAggregate(aggregate, model, tenant))
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
    const author = await utils.getUserCurrent(req)
    req = matchedData(req)
    req = {
      ...req, ...{
        author
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
