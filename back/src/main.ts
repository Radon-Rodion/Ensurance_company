// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(5000);
// }
// bootstrap();
import {config} from 'dotenv';
//import express from 'express';
import {sequelize} from './db';
import {models} from './models/models';
import fileUpload = require('express-fileupload');
import router from './routes/index';
//import errorHandler from './middleware/ErrorHandlingMiddleware';
import path = require('path');
import express = require('express');
import cors = require('cors');

config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Обработка ошибок, последний Middleware
//app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
