// Bài 1.1: Viết 1 đoạn code minh hoạ sự khác biệt giữa var, let, const khi khai báo trong block scope.
var a = "Hello a!";

if(4 > 3) {
    var a = "Hello a1!";
}

console.log(a); //Hello a1!


let b = "Hello b";
if(4 > 3) {
    let b = "Hello b1";
    let c = "Hello c";
}
console.log(b); //hello b
console.log(c); // c is not definded

//Bài 1.2: Thử thay đổi giá trị của biến khai báo bằng const. Điều gì xảy ra?

const a = 1;
a = 2;

console.log(a); //Error: Assignment to constant variable


