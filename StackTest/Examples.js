import Stack from "./lib/Stack.ts";
import ObjStack from "./lib/ObjStack.ts";

// 十进制转二进制（数组栈）
const decimalToBinary = function (decNumber) {
    // 实例化一个栈(数组栈)
    const stack = new Stack();
    // 传进来的十进制数
    let number = decNumber;
    // 余数
    let rem;
    // 二进制结果
    let binaryString = "";
    // 当前十进制结果除以二不为0时继续进行运算
    while (number > 0) {
        // 模运算
        rem = Math.floor(number % 2);
        // 将余数入栈
        stack.push(rem);
        // 当前十进制结果除以二
        number = Math.floor(number / 2);
    }
    // 栈不为空就取出栈内元素拼接到二进制结果中
    while (!stack.isEmpty()) {
        binaryString += stack.pop().toString();
    }
    // 返回二进制结果
    return binaryString;
}
// 十进制转二进制（对象栈）
const decimalToBinaryObjStack = function (decNumber) {
    // 实例化一个栈(数组栈)
    const stack = new ObjStack();
    // 传进来的十进制数
    let number = decNumber;
    // 余数
    let rem;
    // 二进制结果
    let binaryString = "";
    // 当前十进制结果除以二不为0时继续进行运算
    while (number > 0) {
        // 模运算
        rem = Math.floor(number % 2);
        // 将余数入栈
        stack.push(rem);
        // 当前十进制结果除以二
        number = Math.floor(number / 2);
    }
    // 栈不为空就取出栈内元素拼接到二进制结果中
    while (!stack.isEmpty()) {
        binaryString += stack.pop().toString();
    }
    // 返回二进制结果
    return binaryString;
}


const testNumber = 999989993232287;
console.time("数组栈");
console.log(decimalToBinary(testNumber));
console.timeEnd("数组栈");

console.time("对象栈");
const testObjNumber = 999989993232287;
console.log(decimalToBinaryObjStack(testObjNumber));
console.timeEnd("对象栈");



