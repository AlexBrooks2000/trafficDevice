const noCongestion = [{"speed":28,"temp":21},
{"speed":29,"temp":22},
{"speed":30,"temp":21},
{"speed":21,"temp":20},
{"speed":28,"temp":21},
{"speed":27,"temp":21},
{"speed":22,"temp":22},
{"speed":25,"temp":21},
{"speed":29,"temp":21},
{"speed":28,"temp":21},
{"speed":22,"temp":21},
{"speed":24,"temp":23},
{"speed":21,"temp":20},
{"speed":29,"temp":20},
{"speed":29,"temp":22},
{"speed":21,"temp":22},
{"speed":25,"temp":22},
{"speed":30,"temp":23},
{"speed":22,"temp":22},
{"speed":22,"temp":23}];

const lightCongestion = [
{"speed":15,"temp":22},
{"speed":16,"temp":21},
{"speed":14,"temp":22},
{"speed":15,"temp":20},
{"speed":20,"temp":23},
{"speed":16,"temp":22},
{"speed":11,"temp":23},
{"speed":13,"temp":21},
{"speed":20,"temp":20},
{"speed":18,"temp":22},
{"speed":11,"temp":21},
{"speed":19,"temp":21},
{"speed":19,"temp":22},
{"speed":13,"temp":20},
{"speed":13,"temp":22},
{"speed":20,"temp":21},
{"speed":14,"temp":23},
{"speed":15,"temp":21},
{"speed":18,"temp":22},
{"speed":20,"temp":23}];

const heavyCongestion = [
{"speed":7,"temp":20},
{"speed":8,"temp":21},
{"speed":2,"temp":20},
{"speed":5,"temp":21},
{"speed":10,"temp":22},
{"speed":4,"temp":21},
{"speed":10,"temp":20},
{"speed":9,"temp":23},
{"speed":8,"temp":21},
{"speed":6,"temp":20},
{"speed":2,"temp":22},
{"speed":7,"temp":23},
{"speed":5,"temp":20},
{"speed":9,"temp":23},
{"speed":6,"temp":20},
{"speed":2,"temp":22},
{"speed":3,"temp":21},
{"speed":3,"temp":22},
{"speed":7,"temp":20},
{"speed":9,"temp":23}
];

export async function pushNo() {
    const url = 'http://localhost:3000/sendData';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },

    }
    for (const item of noCongestion) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(item)
        };
        await fetch(url, options);
    }
}

export async function pushLight() {
    const url = 'http://localhost:3000/sendData';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },

    }
    for (const item of lightCongestion) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(item)
        };
        await fetch(url, options);
    }
}

export async function pushHeavy() {
    const url = 'http://localhost:3000/sendData';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },

    }
    for (const item of heavyCongestion) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(item)
        };
        await fetch(url, options);
    }
}