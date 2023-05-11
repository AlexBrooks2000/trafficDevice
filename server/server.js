import { error } from 'node:console';
import { post, getSpeed, getTemp, getWeather } from './handle.js';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const city = 'Portsmouth';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const app = express();
const port = (3000);

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/weatherID', getWeather);

app.post('/sendData', post);
app.get('/speed', getSpeed);
app.get('/temp', getTemp);

app.listen(port, () => console.log(`listening on port ${port}`));
