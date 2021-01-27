const routes = require('express').Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../auth');
const paidTimeLog = require('../api/paidTimeLog');
const paidTime = require('../api/paidTime');

routes.post('/', checkJwt, jwtAuthz(['create:timecard']), async(req, res, next) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    try {
        res.status(201).send(await paidTimeLog.create(username, req.body));
    } catch (err) {
        return next(err);
    }
});

routes.delete('/:id', checkJwt, jwtAuthz(['delete:timecard']), async(req, res) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    res.send(await paidTimeLog.revoke(req.params.id, username));
});

routes.get('/', checkJwt, jwtAuthz(['read:timecard']), async (req, res) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    res.send(await paidTimeLog.get(username));
});

routes.get('/range/:start/:end', checkJwt, jwtAuthz(['read:timecard']), async (req, res) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    const result = await paidTimeLog.getRange(username, { start: req.params.start, end: req.params.end });

    res.send(result);
});

routes.get('/available', checkJwt, jwtAuthz(['read:timecard']), async (req, res) => {
    let username = req.user[`${process.env.API_NAMESPACE}/username`] || 'test';

    res.send(await paidTime.get(username));
});

routes.get('/manage/:username', checkJwt, jwtAuthz(['manage:paid-time']), async (req, res) => {
    res.send(await paidTime.get(req.params.username));
});

routes.get('/manage', checkJwt, jwtAuthz(['manage:paid-time']), async (req, res) => {
    res.send(await paidTime.getAll());
});

routes.post('/manage/:username', checkJwt, jwtAuthz(['manage:paid-time']), async (req, res) => {
    res.send(await paidTime.create(req.params.username, req.body));
});

routes.patch('/manage/:username', checkJwt, jwtAuthz(['manage:paid-time']), async (req, res) => {
    res.send(await paidTime.update(req.params.username, req.body));
});

module.exports = routes;
