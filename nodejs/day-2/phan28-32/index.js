const loops = 100;
const totalLoops = loops * 3;

const count = {
    timeOut: 0,
    immediate: 0,
    nextTick: 0
}

const now = performance.now();
console.log('start: ', now);

const order = [];
for(let i = 0; i < loops; i++){
    setTimeout(() => {
        count.timeOut++;
        order.push('timeout');
        checkTime();
    }, 0);
}

for(let i = 0; i < loops; i++){
    setImmediate(() => {
        count.immediate++;
        order.push('immediate');
        checkTime();
    })
}

for(let i = 0; i < loops; i++){
    process.nextTick(() => {
        count.nextTick++;
        order.push('nextTick');
        checkTime();
    })
}

const checkTime = () => {
    if(totalLoops === order.length){
        const end = performance.now();
        console.log('end: ', end);
        console.log('run time: ', Number(end) - Number(now));
        console.log(count);
    }
}