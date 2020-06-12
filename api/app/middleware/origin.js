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
    next();
  } catch (e) {
    req.clientAccount = null;
    next();
  }
}


exports.checkTenant = async (req, res, next) => {
  next();
}
