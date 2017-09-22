const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const routesV1 = require('./v1/routes');
const allowCrossOrigin = require('./v1/middleware/allowCrossOrigin');
const logger = require('../utils/helpers/logger');

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const logLevel = isProd ? 'combined' : 'dev';

app.use(morgan(logLevel, {
  stream: {
    write: message => logger.info(message.trim()),
  },
}));

app.use(helmet());

app.use(bodyParser.json());

app.use(compression());

app.use(helmet.noCache());

app.use(allowCrossOrigin);

app.use('/v1', routesV1);

app.listen(8081, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    logger.error('Service couldn\'t start');
  } else {
    // eslint-disable-next-line no-console
    logger.info('Server running on 8081');
  }
});
