const psl = require('psl');
const extractDomain = require('extract-domain');

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
