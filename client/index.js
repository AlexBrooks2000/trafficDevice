import { pushNo, pushLight, pushHeavy } from "./dummy.js";

const speed = document.querySelector('#speed');
const temp = document.querySelector('#temp');
const traffic = document.querySelector('#traffic');

function getSpeed() {
    return fetch('speed').then(response => {
        if (!response.ok) {
          throw new Error('Not found');
        }
        return response.json();
    });
}

function getTemp() {
    return fetch('temp').then(response => {
        if (!response.ok) {
            throw new Error('not found');
        }
        return response.json();
    });
}

function trafficUpdate(avgSpeed) {
    if (avgSpeed > 20 && avgSpeed <=30 ) {
        return "No congestion";
    } else if (avgSpeed > 10 && avgSpeed <= 20) {
        return ("Light congestion")
    } else if (avgSpeed > 1 && avgSpeed <= 10) {
        return ("Heavy congestion") 
    } else {
        return 'No traffic';
    }
}

setInterval(async () => {
    const newTemp = await getTemp();
    const newSpeed = await getSpeed();
    speed.textContent = newSpeed;
    temp.textContent=newTemp;
    traffic.textContent=trafficUpdate(await newSpeed);
}, 5000);

// Testing only

const no = document.querySelector('#no');
const light = document.querySelector('#light');
const Heavy = document.querySelector('#heavy');

no.addEventListener('click', async ()=> {
    await pushNo();
});
light.addEventListener('click', async ()=> {
    await pushLight();
});
Heavy.addEventListener('click', async ()=> {
    await pushHeavy();
})