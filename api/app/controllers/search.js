const User = require('../models/user')
const Deposits = require('../models/deposits')
const Products = require('../models/products')
const Providers = require('../models/providers')
const Purchase = require('../models/purchase')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/*********************
 * Private functions *
 *********************/

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */


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
    const tenant = req.clientAccount;
    const query = await db.checkQueryString(req.query)
    const queryPurchase = db.getLookListPurchases(Purchase, query, tenant)
    const queryProducts = db.getLookListProducts(Purchase, query, tenant)
    const data = {
      users: await db.getItems(req, User, query),
      deposits: await db.getItems(req, Deposits, query),
      providers: await db.getItems(req, Providers, query),
      purchases: await db.getItemsAggregate(req, Purchase, queryPurchase, tenant),
      products: await db.getItemsAggregate(req, Products, queryProducts, tenant),
    }
    res.status(200).json(data)

  } catch (error) {
    utils.handleError(res, error)
  }
}
