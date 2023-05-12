import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const request = require('request');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const city = 'Portsmouth';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const db = [];
let latestTemp = 0;
let avgSpeed = 0;

export function post(req, res) { 
    const data = req.body;
    const toInt = {
        'speed': parseInt(data.speed),
        'temp': parseInt(data.temp),
    };
    console.log(toInt);
    uploadSpeedAndTemp(toInt);
    latestTemp = toInt.temp;
}

export function getWeather(req, res) {
    request(url, { json: true }, (err, apiRes, body) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
        }
        res.json(body.weather[0].id);
    }); 
    //res.json(400);
    // res.json(1000);
}

export function getSpeed(req, res) {
    res.json(avgSpeed);
}

export function getTemp(req, res) {
    res.json(latestTemp);
}

function uploadSpeedAndTemp(obj) {
    const entry = {
        'time': new Date(),
        'speed': obj.speed,
    };
    db.push(entry);
}

function removeData() {
    const now = new Date();
    const was = new Date(now.getTime() - 1*6000);
    for (let i=0; i<db.length-1, i++;) {
        if(db[i].time.getTime() <= was.getTime()) {
            db.splice(i, 1);
        }
    }
}

function getAvgSpeed() {
    const speed = [];
    for (const obj of db) {
        speed.push(obj.speed);
    }
    const sum = speed.reduce((acc, num) => acc + num, 0);
    const average = sum/ speed.length;
    avgSpeed = Math.round(average);
}

setInterval(() => {
    removeData();
    getAvgSpeed();
}, 10000);