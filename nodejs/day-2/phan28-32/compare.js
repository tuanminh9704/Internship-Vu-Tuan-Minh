console.log('Start!');
setTimeout(() => {
    console.log('setTimeOut!');
}, 0);

process.nextTick(() => {
    console.log('nextTick!');    
});

setImmediate(() => {
    console.log("setImmediate!");
})
console.log('End!');

//OutPut: 
// Start!
// End!
// nextTick!
// setTimeOut!
// setImmediate!