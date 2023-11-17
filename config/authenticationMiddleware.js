//Security using Okta
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaIssuer = process.env.OKTA_ISSUER;

const isDevEnv = process.env.IS_DEV_ENV;

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: oktaIssuer,
});
const audience = 'api://default';

const authenticationRequired = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const accessToken = match[1];

    if (!accessToken) {
      return res.status(401, 'Not authorized').send();
    }
    req.jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience);
    if (isDevEnv) {
      console.log('Verified JWT Token', accessToken);
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
};

module.exports = authenticationRequired;
