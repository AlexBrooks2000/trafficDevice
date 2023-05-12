import { error } from 'node:console';
import { post, getSpeed, getTemp, getWeather } from './handle.js';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = (3000);

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sendData', post);
app.get('/speed', getSpeed);
app.get('/temp', getTemp);
app.get('/weatherID', getWeather);

app.listen(port, () => console.log(`listening on port ${port}`));
