import { pushNo, pushLight, pushHeavy } from "./dummy.js";

const speed = document.querySelector('#speed');
const temp = document.querySelector('#temp');
const traffic = document.querySelector('#traffic');
const condition = document.querySelector('#condition');

function fetchData(data) {
    return fetch(data).then(response => {
        if (!response.ok) {
            throw new Error('not found');
        }
        return response.json();
    });
}

async function roadCondition() {
    const id = await fetchData('weatherID');
    const idINt = parseInt(id)-700;
    if (idINt < 0) {
        condition.textContent = "Caution! Roads are wet and/or dangerous. ";
    } else {
        condition.textContent = "Road Conditions are normal";
    }
}

function trafficUpdate(avgSpeed) {
    if (avgSpeed > 20) {
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
    const newTemp = await fetchData('temp');
    const newSpeed = await fetchData('speed');
    await roadCondition();
    speed.textContent = await newSpeed;
    temp.textContent = await newTemp;
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