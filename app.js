const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const entriesRoutes = require('./routes/entries');
const rangesRoutes = require('./routes/ranges');
const paidTimeRoutes = require('./routes/paidTime');
const totalsRoutes = require('./routes/totals');
const errorHandler = require('./errorHandler');

const db = require('./db');

require('dotenv').config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

(async() => {
    await db.load();
})();

app.use('/entries', entriesRoutes);
app.use('/ranges', rangesRoutes);
app.use('/paid-time', paidTimeRoutes);
app.use('/totals', totalsRoutes);

app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }));

app.use(errorHandler);

app.listen(process.env.APP_PORT);
