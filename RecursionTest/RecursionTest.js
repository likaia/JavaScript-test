// 理解递归
function understandRecursion(doIunderstandRecursion) {
    const recursionAnswer = confirm('Do you understand recursion?');
    if (recursionAnswer === true) { // 基线条件或停止点
        return true;
    }
    understandRecursion(recursionAnswer); // 递归调用
}
// understandRecursion();

// 阶乘计算
const factorial = function (number) {
    if (typeof number === "number" && number > 0){
        let total = 1;
        for (let n = number; n > 1; n--){
            total = total * n;
        }
        return total;
    }
    return undefined;
}

// 阶乘计算(递归)
const factorialRecursion = function (number,total = 1) {
    if (typeof number === "number"){
        if ( number > 0 ){
            total = total * number;
            number = number - 1;
            return  factorialRecursion(number,total);
        }
        return total;
    }
    return undefined;
}

// 阶乘计算(优化后的递归)
const factorialRecursionOptimization = function (number) {
    if (number === 1 || number === 0){
        return 1;
    }
    return number * factorialRecursionOptimization(number - 1);
}

const result = factorialRecursionOptimization(5);
console.log("5的阶乘为: ",result)

// 测试递归多少次就爆栈
/*let i = 0;
function recursiveFn() {
    i++;
    recursiveFn();
}

try {
    recursiveFn();
}catch (e) {
    console.log('i = ' + i + ' error: ' + e);
}*/

// 求特定位置的斐波那契数
const fibonacciNumbers = function (index) {
    // 0号位置的斐波那契数是0
    if (index < 1) return 0;
    // 1号和2号位置的斐波那契数是1
    if (index <= 2) return 1;
    // n - 1位置
    let prev = 1;
    // n - 2位置
    let prevTwo = 0;
    let result = index;
    for (let i = 2; i <= index; i++){
        // n(此处n>2)号位置的斐波那契数是(n-1)的斐波那契数 + (n - 2)的斐波那契数
        result = prev + prevTwo;
        // n-2位置的值就是prev
        prevTwo = prev;
        // n-1位置的值就是result
        prev = result;
    }
    return result;
}

// 求特定位置的斐波那契数(递归)
const fibonacciNumbersRecursive = function(index){
    // 递归终止条件
    if (index < 1) return 0;
    if (index <= 2) return 1;
    return fibonacciNumbersRecursive(index - 1) + fibonacciNumbersRecursive(index - 2);
}

// 求特定位置的斐波那契数(记忆化递归)
const fibonacciNumbersMemoryRecursive = function () {
    const memory = [0,1];
    const fibonacci = function (n) {
        if (memory[n] !=null) return memory[n];
        return memory[n] = fibonacci(n-1,memory) + factorial(n-2,memory);
    }
    return fibonacci;
};

console.log("斐波那契数测试", fibonacciNumbersRecursive(5));