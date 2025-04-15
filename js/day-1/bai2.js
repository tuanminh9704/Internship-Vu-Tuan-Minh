// Bài 2.1: Viết lại các hàm sau bằng arrow function:
// function greet(name) {
//     return 'Hello ' + name;
// }

// function square(n) {
//     return n * n;
// }

const greet = (name) => {
    return 'Hello' + name;
}

const square = (n) => {
    return n * n;
}

// Bài 2.2: Viết arrow function để nhận 1 mảng số, trả về mảng chứa bình phương của mỗi số.
const squareArray = (arr) => arr.map(num => num * num);

const numbers = [1, 2, 3, 4, 5];
const squared = squareArray(numbers);
console.log(squared);
  
  