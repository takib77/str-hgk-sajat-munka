const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const morgan = require("morgan");
const logger = require('./config/logger');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/person', require('./routes/people'));

// Swagger.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling.
app.use((err, req, res, next) => {
  console.error(`ERR ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message
  });
});

// MongoDB connection.
mongoose
  .connect('mongodb+srv://mongo:mongo@cluster0.p3vc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => logger.info('MongoDB connection has been established successfully.'))
  .catch(err => {
    logger.error(err);
    process.exit();
  });


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});