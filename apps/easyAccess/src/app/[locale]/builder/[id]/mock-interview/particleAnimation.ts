type Particle = {
    x: number;
    y: number;
    z: number;
    velX: number;
    velY: number;
    velZ: number;
    age: number;
    dead: boolean;
    right: boolean;
    alpha: number;
    projX: number;
    projY: number;
    attack: number;
    hold: number;
    decay: number;
    initValue: number;
    holdValue: number;
    lastValue: number;
    stuckTime: number;
    accelX: number;
    accelY: number;
    accelZ: number;
    next?: Particle;
    prev?: Particle;
};

type ParticleList = {
    first: Particle | undefined;
};

const sphereRad = 280;
const radius_sp = 1;
let framesPerRotation = 5000;
let r = 52, g = 235, b = 222;  // default light blue color

const turnSpeed = () => 2 * Math.PI / framesPerRotation;

const setLightBlue = () => { r = 52; g = 235; b = 222; };
const setOrange = () => { r = 255; g = 191; b = 0; };
const setViolet = () => { r = 235; g = 67; b = 250; };
const setFuchsia = () => { r = 201; g = 10; b = 144; };

const wait = 1;
let count = wait - 1;
const numToAddEachFrame = 8;
const particleList: ParticleList = { first: undefined };
const recycleBin: ParticleList = { first: undefined };
const particleAlpha = 1;
const fLen = 320;
const zMax = fLen - 2;
let turnAngle = 1;
const sphereCenterY = 0, sphereCenterZ = -3 - sphereRad;
const particleRad = 2.5;

const zeroAlphaDepth = -750;

const randAccelX = 0.1, randAccelY = 0.1, randAccelZ = 0.1;
const gravity = -0;
const rgbString = () => `rgba(${r},${g},${b},`;

function draw(context: CanvasRenderingContext2D, displayWidth: number, displayHeight: number, projCenterX: number, projCenterY: number) {
    count++;
    if (count >= wait) {
        count = 0;
        for (let i = 0; i < numToAddEachFrame; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(Math.random() * 2 - 1);
            const x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
            const y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
            const z0 = sphereRad * Math.cos(phi);

            const p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);

            p.attack = 50;
            p.hold = 50;
            p.decay = 100;
            p.initValue = 0;
            p.holdValue = particleAlpha;
            p.lastValue = 0;
            p.stuckTime = 90 + Math.random() * 20;
            p.accelX = 0;
            p.accelY = gravity;
            p.accelZ = 0;
        }
    }

    turnAngle = (turnAngle + turnSpeed()) % (2 * Math.PI);
    const sinAngle = Math.sin(turnAngle);
    const cosAngle = Math.cos(turnAngle);

    // Use a semi-transparent background color based on the current theme
    context.fillStyle = "rgba(var(--background), 0.3)";
    context.fillRect(0, 0, displayWidth, displayHeight);

    let p = particleList.first;
    while (p != null) {
        const nextParticle = p.next;

        p.age++;

        if (p.age > p.stuckTime) {
            p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
            p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
            p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);

            p.x += p.velX;
            p.y += p.velY;
            p.z += p.velZ;
        }

        const rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
        const rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
        const m = radius_sp * fLen / (fLen - rotZ);
        p.projX = rotX * m + projCenterX;
        p.projY = p.y * m + projCenterY;

        if (p.age < p.attack + p.hold + p.decay) {
            if (p.age < p.attack) {
                p.alpha = (p.holdValue - p.initValue) / p.attack * p.age + p.initValue;
            } else if (p.age < p.attack + p.hold) {
                p.alpha = p.holdValue;
            } else if (p.age < p.attack + p.hold + p.decay) {
                p.alpha = (p.lastValue - p.holdValue) / p.decay * (p.age - p.attack - p.hold) + p.holdValue;
            }
        } else {
            p.dead = true;
        }

        const outsideTest = (p.projX > displayWidth) || (p.projX < 0) || (p.projY < 0) || (p.projY > displayHeight) || (rotZ > zMax);

        if (outsideTest || p.dead) {
            recycle(p);
        } else {
            const depthAlphaFactor = (1 - rotZ / zeroAlphaDepth);
            context.fillStyle = rgbString() + Math.max(Math.min(depthAlphaFactor, 1), 0) * p.alpha + ")";
            context.beginPath();
            context.arc(p.projX, p.projY, m * particleRad, 0, 2 * Math.PI, false);
            context.closePath();
            context.fill();
        }

        p = nextParticle;
    }
}

function addParticle(x0: number, y0: number, z0: number, vx0: number, vy0: number, vz0: number): Particle {
    let newParticle: Particle;

    if (recycleBin.first != null) {
        newParticle = recycleBin.first;
        if (newParticle.next != null) {
            recycleBin.first = newParticle.next;
            newParticle.next.prev = undefined;
        } else {
            recycleBin.first = undefined;
        }
    } else {
        newParticle = {} as Particle;
    }

    if (particleList.first == null) {
        particleList.first = newParticle;
        newParticle.prev = undefined;
        newParticle.next = undefined;
    } else {
        newParticle.next = particleList.first;
        particleList.first.prev = newParticle;
        particleList.first = newParticle;
        newParticle.prev = undefined;
    }

    newParticle.x = x0;
    newParticle.y = y0;
    newParticle.z = z0;
    newParticle.velX = vx0;
    newParticle.velY = vy0;
    newParticle.velZ = vz0;
    newParticle.age = 0;
    newParticle.dead = false;
    newParticle.right = Math.random() < 0.5;
    return newParticle;
}

function recycle(p: Particle) {
    if (particleList.first === p) {
        if (p.next != null) {
            p.next.prev = undefined;
            particleList.first = p.next;
        } else {
            particleList.first = undefined;
        }
    } else {
        if (p.next == null) {
            if (p.prev) p.prev.next = undefined;
        } else {
            if (p.prev) {
                p.prev.next = p.next;
                p.next.prev = p.prev;
            }
        }
    }

    if (recycleBin.first == null) {
        recycleBin.first = p;
        p.prev = undefined;
        p.next = undefined;
    } else {
        p.next = recycleBin.first;
        recycleBin.first.prev = p;
        recycleBin.first = p;
        p.prev = undefined;
    }
}

export const particleActions = {
    onUserSpeaking: () => {
        console.log("user speaking");
        framesPerRotation = 5000;
        setOrange();
    },
    onProcessing: () => {
        console.log("processing");
        framesPerRotation = 1000;
        setViolet();
    },
    onAiSpeaking: () => {
        console.log("ai speaking");
        framesPerRotation = 5000;
        setFuchsia();
    },
    reset: () => {
        console.log("reset");
        framesPerRotation = 5000;
        setLightBlue();
    },
    draw
};