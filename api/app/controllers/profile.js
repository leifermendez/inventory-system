const model = require('../models/user')
const utils = require('../middleware/utils')
const {matchedData} = require('express-validator')
const auth = require('../middleware/auth')

/*********************
 * Private functions *
 *********************/

/**
 * Gets profile from database by id
 * @param {string} id - user id
 * @param tenant
 */
const getProfileFromDB = async (id, tenant = null) => {
  return new Promise((resolve, reject) => {
    model.byTenant(tenant)
      .findById(id, '-_id -updatedAt -createdAt', (err, user) => {
        utils.itemNotFound(err, user, reject, 'NOT_FOUND')
        resolve(user)
      })
  })
}

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 * @param tenant
 */
const updateProfileInDB = async (req, id, tenant = null) => {
  return new Promise((resolve, reject) => {
    model.byTenant(tenant)
      .findByIdAndUpdate(
        id,
        req,
        {
          new: true,
          runValidators: true,
          select: '-role -_id -updatedAt -createdAt'
        },
        (err, user) => {
          utils.itemNotFound(err, user, reject, 'NOT_FOUND')
          resolve(user)
        }
      )
  })
}

/**
 * Finds user by id
 * @param id
 * @param tenant
 */
const findUser = async (id, tenant = null) => {
  return new Promise((resolve, reject) => {
    model.byTenant(tenant)
      .findById(id, 'password email', (err, user) => {
        utils.itemNotFound(err, user, reject, 'USER_DOES_NOT_EXIST')
        resolve(user)
      })
  })
}

/**
 * Build passwords do not match object
 * @param {Object} user - user object
 */
const passwordsDoNotMatch = async () => {
  return new Promise((resolve) => {
    resolve(utils.buildErrObject(409, 'WRONG_PASSWORD'))
  })
}

/**
 * Changes password in database
 * @param {string} id - user id
 * @param {Object} req - request object
 * @param tenant
 */
const changePasswordInDB = async (id, req, tenant = null) => {
  return new Promise((resolve, reject) => {
    model.byTenant(tenant)
      .findById(id, '+password', (err, user) => {
        utils.itemNotFound(err, user, reject, 'NOT_FOUND')

        // Assigns new password to user
        user.password = req.newPassword

        // Saves in DB
        user.save((error) => {
          if (err) {
            reject(utils.buildErrObject(422, error.message))
          }
          resolve(utils.buildSuccObject('PASSWORD_CHANGED'))
        })
      })
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getProfile = async (req, res) => {
  try {
    const tenant = req.clientAccount;
    const id = await utils.isIDGood(req.user._id)
    res.status(200).json(await getProfileFromDB(id, tenant))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateProfile = async (req, res) => {
  try {
    const tenant = req.clientAccount;
    const id = await utils.isIDGood(req.user._id)
    req = matchedData(req)
    res.status(200).json(await updateProfileInDB(req, id, tenant))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.changePassword = async (req, res) => {
  try {
    const tenant = req.clientAccount;
    const id = await utils.isIDGood(req.user._id)
    const user = await findUser(id,tenant)
    req = matchedData(req)
    const isPasswordMatch = await auth.checkPassword(req.oldPassword, user)
    if (!isPasswordMatch) {
      utils.handleError(res, await passwordsDoNotMatch())
    } else {
      // all ok, proceed to change password
      res.status(200).json(await changePasswordInDB(id, req,tenant))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}
