import events from 'events';

const emitter = new events.EventEmitter();
const title = 'Hello word!';

emitter.on('event', (title) => {
    console.log(title);
})

emitter.emit('event', title);