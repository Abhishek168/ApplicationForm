import express from 'express';
import cors from 'cors';
import publicRoutes from './src/routes/public';
import privateRoutes from './src/routes/private';

import jwtVerify from './src/middleware/jwtVerify';

require('./src/config/sequelize');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/pub', publicRoutes);
app.use('/auth', jwtVerify, privateRoutes);

module.exports = app;
