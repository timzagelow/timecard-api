const routes = require('express').Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../auth');
const totals = require('../api/totals');

routes.get('/:start/:end', checkJwt, jwtAuthz(['manage:pay-periods']), async (req, res) => {
    res.send(await totals.getTotals({ start: req.params.start, end: req.params.end }));
});

module.exports = routes;
