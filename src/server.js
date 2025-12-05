const express = require('express');
const dotenv = require('dotenv');
const fileRouter = require('./routes/minio');
dotenv.config();
const app = express();

app.use('/file', fileRouter);

app.listen(process.env.PORT);