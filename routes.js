const routes = require('express').Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('./auth');
const entries = require('./api/entries');
const ranges = require('./api/ranges');

/* ENTRIES */
routes.post('/entries', checkJwt, jwtAuthz(['create:timecard']), async(req, res, next) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    res.status(201).send(await entries.create(username));
});

routes.patch('/entries/:id', checkJwt, jwtAuthz(['update:timecard']), async(req, res, next) => {
    res.send(await entries.update(req.params.id, req.body));
});

routes.get('/entries', checkJwt, jwtAuthz(['read:timecard']), async (req, res, next) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    res.send(await entries.getAllEntries(username));
});

routes.get('/entries/range/:start/:end', checkJwt, jwtAuthz(['read:timecard']), async (req, res, next) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    const result = await entries.getRange(username, { start: req.params.start, end: req.params.end });

    res.send(result);
});


/* RANGES */
routes.post('/ranges', checkJwt, jwtAuthz(['manage:pay-periods']), async(req, res, next) => {
    res.status(201).send(await ranges.create(req.body));
});

routes.patch('/ranges/:id', checkJwt, jwtAuthz(['manage:pay-periods']), async(req, res, next) => {
    res.send(await ranges.update(req.params.id, req.body));
});

routes.get('/ranges', checkJwt, async (req, res, next) => {
    let payload = await ranges.getRanges();
    let code = payload.length ? 200 : 204;

    res.status(code).send(payload);
});

routes.get('/ranges/current', checkJwt, async (req, res, next) => {
    let current = await ranges.getCurrent();

    let code = current.length ? 200 : 204;

    res.status(code).send(current);
});

module.exports = routes;
