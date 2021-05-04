const routes = require('express').Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../auth');
const calendar = require('../api/calendar');

routes.post('/', checkJwt, async(req, res) => {
    res.status(201).send(await calendar.create(req.body.username, req.body.title, req.body.start, req.body.end));
});

routes.delete('/:id', checkJwt, async(req, res) => {
    res.send(await calendar.remove(req.params.id));
});

routes.get('/:from/:to', async (req, res) => {
    res.send(await calendar.get(req.params.from, req.params.to));
});

module.exports = routes;
