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