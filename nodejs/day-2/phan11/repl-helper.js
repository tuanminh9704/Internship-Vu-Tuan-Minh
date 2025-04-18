import repl from 'repl';
import fs from 'fs';

const sayHi = () => {
    console.log("Hi!");
}

const now = () => {
    const now = new Date().toLocaleDateString();
    return now;
}

const sum = (a, b) => {
    return a + b;
}

const history = [];

// init repl
const run = repl.start({
    // cmd là người dùng sẽ nhập 
    // context: Đối tượng chứa tất cả các biến trong REPL hiện tại

    eval: (cmd, context, filename, callback) => {
        const input = cmd.trim();
        history.push(input);
        if(input === 'sayHi') {
            return callback(sayHi());
        }
        else if(input === 'now') {
            return callback(now());
        }
        else if(input === 'sum'){
            return callback(sum(1, 2));
        }
        else {
            return callback(null);
        }

    },
    completer: (line) => {
        const completions = ['sayHi', 'now', 'sum'];
        const result = completions.filter((c) => c.startsWith(line));
        return [result.length ? result : completions, line];    
    }
})


run.defineCommand("save", {
    help: "Save REPL history to file history.txt",
    action() {
        fs.writeFileSync('history.txt', history.join(" "));
        console.log("Save success!");
    }
})