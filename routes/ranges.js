const routes = require('express').Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../auth');
const ranges = require('../api/ranges');

routes.post('/', checkJwt, jwtAuthz(['manage:pay-periods']), async(req, res) => {
    res.status(201).send(await ranges.create(req.body));
});

routes.patch('/:id', checkJwt, jwtAuthz(['manage:pay-periods']), async(req, res) => {
    res.send(await ranges.update(req.params.id, req.body));
});

routes.get('/', checkJwt, async (req, res, next) => {
    let payload = await ranges.getRanges();
    let code = payload.length ? 200 : 204;

    res.status(code).send(payload);
});

routes.get('/current', checkJwt, async (req, res, next) => {
    let current = await ranges.getCurrent();

    let code = current.length ? 200 : 204;

    res.status(code).send(current);
});

routes.delete('/:id', checkJwt, jwtAuthz(['manage:pay-periods']), async(req, res) => {
    await ranges.remove(req.params.id);

    res.status(204).send();
});

module.exports = routes;
