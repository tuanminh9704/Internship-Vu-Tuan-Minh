// Bài 3.1: Dùng spread để copy mảng, thêm phần tử mới.
const oldArray = [1, 2, 3];
const newArray = [...oldArray, 4, 5];
console.log(newArray);

// Bài 3.2: Viết hàm sumAll(...numbers) dùng rest để tính tổng n số bất kỳ.
const sumAll = (...numbers) => numbers.reduce((total, num) => total + num, 0);

console.log(sumAll(1, 2, 3));       
  


