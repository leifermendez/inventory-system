const psl = require('psl');
const global = require('../../config/global')
/**
 *
 */
const parseDomain = (data = []) => {
  try {
    return data[1];
  } catch (e) {
    return null;
  }
}

const handleErrorParent = (res = {}, message = '', code = 401) => {
  res.status(code).json({
    errors: {
      msg: message
    }
  })
}

exports.checkDomain = async (req, res, next) => {
  try {

    const origin = req.get('origin');
    const re = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/ig;
    const result = re.exec(origin);
    const rawDomain = parseDomain(result);
    const clean = psl.parse(rawDomain);
    req.clientAccount = clean.subdomain;
    console.log('USER: ---> ', req.clientAccount)
    next();
  } catch (e) {
    req.clientAccount = null;
    next();
  }
}


exports.checkTenant = async (req, res, next) => {
  try {

    global.getParentConnection(req)
      .then(db => {
        if (db) {
          req.parentAccount = db;
          next()
        } else {
          handleErrorParent(res, 'NOT_ACTIVE_ACCOUNT', 406)
        }
      }).catch(error => {
      handleErrorParent(res, 'NOT_ACTIVE_ACCOUNT', 406)
    })
  } catch (e) {
    handleErrorParent(res, 'ERROR_CONNECTION_PARENT', 400)
  }
}
