const speed = document.querySelector('#speed');
const temp = document.querySelector('#temp');

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

setInterval(async () => {
    const newTemp = await getTemp();
    const newSpeed = await getSpeed();
    speed.textContent = newSpeed;
    temp.textContent=newTemp;
}, 5000);
