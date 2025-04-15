const array = [1, 2, 3, 4, 5];

const newArray = array.map(item => item * 2);
const filterArray = array.filter(item => item % 2 == 0);
const sum = array.reduce((total, item) => total + item , 0);
console.log(newArray);
console.log(filterArray);
console.log(sum);