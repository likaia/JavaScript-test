// 在数组的任意位置添加或删除元素 splice
let arr = [15, 6, 7, 8, 9, 12, 3, 3, 54];
arr.splice(3, 2);
// delete删除元素，删除的元素会变成undefined
delete arr[1];
// 使用splice在任意位置添加元素
arr.splice(4, 0, 1, 55, 77, 88);
console.log(arr);

// 多维数组
let multiArr = [
    [12, 15, 6, 7, 8, 9, 19],
    [90, 19, 78, 56, 45, 6, 78]
];
console.table(multiArr);

// 数组拼接
let arrLeftData = [18, 9, 12, 19, 29, 43, 50];
let arrRightData = [7, 8, 9, 2, 3, 4, 5, 6];
console.log(arrLeftData.concat(arrRightData));

// 为数组的每个函数运行指定函数(every),every执行的函数如果返回true则every返回的结果就为true，否则就是false
const isMax = (item) => {
    return item >= 9;
};
// 为数组的每个参数都运行isMax函数,检测数组中的每个元素是否都大于等于9
console.log(arrLeftData.every(isMax));

// 为数组的每个函数运行指定函数(filter),返回的结果为满足filter所执行函数的元素集合
const resultData = (item) => {
    return item > 5;
};
// 执行resultData函数，返回大于5的数
console.log(arrRightData.filter(resultData));

// 将所有数组元素拼接成字符串 join,可接收一个参数，用于控制字符串中
let arrData = [1, 5, 6, 7, 55, 8, 9, 19];
console.log(arrData.join());

// indexOf 查找特定元素在数组中的索引
console.log(arrRightData.indexOf(6));
console.log(arrRightData.lastIndexOf(6));

// map 对数组中的每个元素运行给定函数 返回每次函数调用的结果组成的数组
let arrMapData = [5, 6, 8, 9, 1, 2, 3, 4, 5];
const mapResult = arrMapData.map((item) => {
    return { num: item };
});

console.log(mapResult);

// reverse 颠倒数组中元素的顺序
let reverseData = [1, 5, 6, 7, 8, 9, 0];
console.log(reverseData.reverse());

// slice 获取指定范围内的数组数据
let sliceData = [12, 56, 23, 4, 5, 6, 76, 67];
console.log(sliceData.slice(1, 5));

// some 判断数组的的元素是否至少有一个负责提供函数的验证方法
let someData = [3, 8, 9, 2, 3, 4, 5, 6];
const someFun = (item) => {
    return item > 10;
};
console.log(someData.some(someFun));

// sort 对数组中的元素进行排序,a-b为从小到大排序，b-a为从大到小排序
let sortData = [12, 5, 6, 7, 7, 1, 8, 0, 6, 2, 1, 4, 65, 7, 8];
const sortFun = (a, b) => {
    return a - b;
};
console.log(sortData.sort(sortFun));

// reduce 有2个必要参数 previous(上一个值)和current(当前值)，返回函数中计算的结果作为上一个值，当前索引为当前值
let reduceData = [1, 3, 4, 54, 6, 7, 8, 9];
let reduceResultData = reduceData.reduce((previous, current) => {
    return previous + current;
});
console.log(reduceResultData);

// copyWithin
let copyArrData = [1, 5, 7, 9, 2, 4];
console.log(copyArrData.copyWithin(0, 3, 5));
