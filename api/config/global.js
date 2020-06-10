const parentConnect = require('./parent.db')

exports.getParentConnection = (req) => new Promise(async (resolve, reject) => {
  try {
    const product = await parentConnect.checkTenant(req);
    resolve(product)
  } catch (e) {
    reject(e)
  }
})
