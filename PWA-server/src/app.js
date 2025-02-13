import dotenv from 'dotenv';
import express from 'express';

import morgan from 'morgan';
import cors from 'cors';

import { errorHandler, notFoundHandler } from './error/errorHandler.js';
import Ro from './api/routes/route.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());

app.use('/games', Ro);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT ?? 5555;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
console.log('Server started');
