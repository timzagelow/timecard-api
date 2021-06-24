const logger = require('./logger');

module.exports = (err, req, res) => {
    let status = 500;

    if (err.status) {
        status = err.status;
    } else if (err.statusCode) {
        status = err.statusCode;
    }

    err.url = req.url;
    err.method = req.method;

    logger.error(err.message, { code: status, errors: err });

    res.status(status).send({ message: err.message });
};