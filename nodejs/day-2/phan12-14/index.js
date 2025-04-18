import readline from 'readline';
import { stdin, stdout } from 'process';

const input = stdin;
const output = stdout;

const rl = readline.createInterface({input, output});

const sayHello = (name) => {
    console.log(`Hello ${name}`);
}

const sum = (a, b) => {
    return a + b;
}

rl.question('question: ', (answer) => {
    if(answer == 'sum') {
        rl.question('enter 2 numbersnumbers: ', (nums) => {
            const [a, b] = nums.trim().split(' ').map(Number);
            if (isNaN(a) || isNaN(b)) {
            } else {
                const result = sum(a, b);
                console.log(result);
            }
            rl.close();
        }); 
    }
    else if(typeof(answer) === 'string'){
        sayHello(answer);
        rl.close(); 
    }
    else {
        rl.close();
    }
})
