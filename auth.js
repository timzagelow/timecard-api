const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.API_DOMAIN}.well-known/jwks.json`
    }),
    audience: process.env.API_IDENTIFIER,
    issuer: `https://${process.env.API_DOMAIN}`,
    algorithms: [ 'RS256' ],
});

module.exports = {
    checkJwt
};