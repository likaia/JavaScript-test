const add = function (a: number, b: number) {
    return a + b;
};
const sub = function (a: number, b: number) {
    return a - b;
};

// sub方法应用add方法，传入参数2，3
const applyFn = add.apply(sub, [2, 3]);
// add方法应用sub方法，传入参数2，3
const callFn = sub.apply(add, [2, 3]);
console.log("apply函数调用结果", applyFn);
console.log("callFn函数调用结果", callFn);
