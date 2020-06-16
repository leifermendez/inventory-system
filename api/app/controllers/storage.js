const model = require('../models/storage')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const multer = require('multer')
const managerStorage = require('../service/storage')
const detect = require('detect-file-type');
/*********************
 * Private functions *
 *********************/

/**
 *
 */
const textRandom = () => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}


/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const cityExistsExcludingItself = async (id, name) => {
  return new Promise((resolve, reject) => {
    model.findOne(
      {
        name,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        utils.itemAlreadyExists(err, item, reject, 'CITY_ALREADY_EXISTS')
        resolve(false)
      }
    )
  })
}

/**
 *
 */
const getFile = (path = null) => new Promise((resolve, reject) => {
  detect.fromFile(path, function (err, result) {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  });
})

/**
 *
 */

const getUrlPath = (mode = '', name = '') => {
  return `${process.env.APP_URL}/media/${mode}_${name}`
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

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/media/')
  },
  filename(req, file, cb) {
    cb(null, `original_${file.originalname}`)
  }
})


/********************
 * Public functions *
 ********************/
exports.upload = multer({storage})
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
    const doesCityExists = await cityExistsExcludingItself(id, req.name)
    if (!doesCityExists) {
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
    const tenant = req.clientAccount;
    const {files = []} = req;
    const list = files.map(async file => {
      const {mime, ext} = await getFile(file.path)
      const isImage = mime.includes('image');
      const author = await utils.getUserCurrent(req, true)
      if (!isImage) {
        utils.handleError(res, {
          code: 400,
          message: 'not support'
        })
      }

      const nameRandomFile = await textRandom();
      const name = `${nameRandomFile}.${ext}`
      await managerStorage.resizeFileOriginal(file.originalname, `${name}`)
      const data = {
        original: getUrlPath('original', name),
        small: getUrlPath('small', name),
        medium: getUrlPath('medium', name),
        large: getUrlPath('large', name),
        author
      };
      return await db.createItem(data, model, tenant)
    })

    const all = await Promise.all(list);
    res.status(201).json({data: all})
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
