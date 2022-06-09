import dotenv from 'dotenv';
import express, { $static } from 'express';

dotenv.config();
const app = express();

app.use($static('./dist'));

app.listen(process.env.PORT || 3000);
