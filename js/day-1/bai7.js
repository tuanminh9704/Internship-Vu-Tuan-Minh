// Bài 7.1: Viết ví dụ để chứng minh number là kiểu primitive, còn object là kiểu tham chiếu
let numberOne  = 100;
let numberTwo = numberOne;
numberOne = 200;

console.log(numberOne) // 200
console.log(numberTwo) // 100

const object1 = {
    name: 'Nguyen Van a',
    age: 18
}

const object2 = object1;
object2.age = 19;
console.log(object1); // { name: 'Nguyen Van a', age: 19 }
console.log(object2); // { name: 'Nguyen Van a', age: 19 }
