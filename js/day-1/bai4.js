// Bài 4.1: Dùng destructuring để tách các phần tử từ object sau:
const user = { name: 'An', age: 20, city: 'HCM' };

const {name} = user;
console.log(name);

// Bài 4.2: Dùng destructuring để tách phần tử đầu và phần còn lại từ mảng:
const colors = ['red', 'green', 'blue'];
const [a, ...b] = colors;
console.log(a);

console.log(b);





