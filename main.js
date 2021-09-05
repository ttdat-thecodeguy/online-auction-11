const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');
const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json')


app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
app.use('/api/account', require('./routes/Account'));

const PORT = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.status(404).json({
        message: 'endpoint not found'
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: 'server failure'
    });
});

app.listen(PORT, function() {
    console.log(`Application is running at http://localhost:${PORT}`);
});