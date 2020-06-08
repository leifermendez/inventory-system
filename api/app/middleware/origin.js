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

exports.checkDomain = async (req, res, next) => {
  try {
    global.getVariable(null);
    const origin = req.get('origin');
    const re = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/ig;
    const result = re.exec(origin);
    const rawDomain = parseDomain(result);
    const clean = psl.parse(rawDomain);
    req.clientAccount = clean.subdomain;
    console.log('USER: ---> ',req.clientAccount)
    next();
  } catch (e) {
    req.clientAccount = null;
    next();
  }


}
