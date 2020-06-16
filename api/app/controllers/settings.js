const model = require('../models/settings')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const multer = require('multer')
const detect = require('detect-file-type');
const managerStorage = require('../service/storage')

/*********************
 * Private functions *
 *********************/

/**
 * Checks if a city already exists excluding itself
 * @param path
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
 *
 * @returns {string}
 * @param mode
 * @param name
 */
const getUrlPath = (mode = '', name = '') => {
  return `${process.env.APP_URL}/media/${mode}_${name}`
}
/**
 *
 * @param path
 * @returns {Promise<unknown>}
 */

const getFile = (path = null) => new Promise((resolve, reject) => {
  detect.fromFile(path, function (err, result) {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  });
});
/**
 * Gets all items from database
 */
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
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.getItem(id, model))
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
    const {file = {}} = req;
    const {id} = req.params
    const {name, currency, currencySymbol} = req.body
    await utils.isIDGood(id)
    const {mime, ext} = await getFile(file.path)
    const isImage = mime.includes('image');
    // const author = await utils.getUserCurrent(req, true)
    if (!isImage) {
      utils.handleError(res, {
        code: 400,
        message: 'not support'
      })
    }
    const nameRandomFile = await textRandom();
    const imageName = `logo_${nameRandomFile}.${ext}`
    await managerStorage.resizeFileOriginal(file.originalname, `${imageName}`)
    const data = {
      logo: getUrlPath('medium', imageName),
      name,
      currencySymbol,
      currency
    };

    res.status(200).json(await db.updateItem(id, model, data, tenant))
  } catch (error) {
    utils.handleError(res, error)
  }
}
