const routes = require('express').Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../auth');
const entries = require('../api/entries');

routes.post('/', checkJwt, jwtAuthz(['create:timecard']), async(req, res) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    res.status(201).send(await entries.create(username));
});

routes.patch('/:id', checkJwt, jwtAuthz(['update:timecard']), async(req, res) => {
    res.send(await entries.update(req.params.id, req.body));
});

routes.get('/', checkJwt, jwtAuthz(['read:timecard']), async (req, res) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    res.send(await entries.getAllEntries(username));
});

routes.get('/range/:start/:end', checkJwt, jwtAuthz(['read:timecard']), async (req, res) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    const result = await entries.getRange(username, { start: req.params.start, end: req.params.end });

    res.send(result);
});

module.exports = routes;
