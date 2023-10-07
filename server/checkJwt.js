const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://sbjotihunt.nl/auth0/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  aud: 'https://sbjotihunt.nl/auth0/api/v2/',
  issuer: 'https://sbjotihunt.nl/auth0/',
  algorithms: ['RS256'],
});

module.exports = checkJwt;
