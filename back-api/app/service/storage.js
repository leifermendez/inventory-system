const Jimp = require('jimp')
const model = require('../models/storage')
const db = require('../middleware/db')
const utils = require('../middleware/utils')
/**
 * Checks if given ID is good for MongoDB
 * @param {string} originalName - id to check
 * @param {string} newName - id to check
 */
exports.resizeFileOriginal = async (originalName, newName) => {
  const fileName = `${__dirname}/../../public/media/original_${originalName}`
  const original = `${__dirname}/../../public/media/original_${newName}`
  const small = `${__dirname}/../../public/media/small_${newName}`
  const medium = `${__dirname}/../../public/media/medium_${newName}`
  const large = `${__dirname}/../../public/media/large_${newName}`
  return new Promise((resolve, reject) => {
    Jimp.read(fileName, (err, lenna) => {
      if (err) {
        throw err
      }
      lenna.write(original)
      lenna.resize(200, Jimp.AUTO).write(small)
      lenna.resize(600, Jimp.AUTO).write(medium)
      lenna.resize(1000, Jimp.AUTO).write(large)
      resolve(true)
    })
  })
}

exports.ImageById = async id => {
  const data = await db.getItem(id, model)
  if (data._id) {
    return data
  }
  return utils.buildErrObject(422, 'NOT_FOUND')
}
