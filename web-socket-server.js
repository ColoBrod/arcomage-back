

// Modules
const express = require('express');
const router = require('./router');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./limiter');

// Config
const cfg = require('./config');
const app = express();

// Middleware
app.use(cors({ origin: cfg.cors.origin }));
app.use(express.json()); // required for parsing requests body
app.use(helmet()); // Protects from attacks
app.use(limiter); // Protects from DoS-attacks

app.use('/', router);
// app.use('/html', express.static('public/html'));

app.listen(cfg.port, () => console.log(`Listening on port ${cfg.port}`));

require('./cmd');