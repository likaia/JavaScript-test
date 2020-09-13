import { DesignSkills } from "./lib/DesignSkills.ts";
const designSkills = new DesignSkills();
// const result = designSkills.minCoinChange([1, 5, 10, 25], 8);
// console.log(result);
//
// const values = [3, 4, 5],
//     weights = [2, 3, 4],
//     capacity = 5,
//     n = values.length;
// console.log("所有组成方案的最大价值为", designSkills.knapSack(capacity, weights, values, n));
//
// const solution = designSkills.lcsSolution("acbaed", "abcadf");
// console.log(solution);
//
// const p = [10, 100, 5, 50, 1];
// console.log("矩阵链相乘其最优组合方式：");
// const frequency = designSkills.matrixChainOrder(p);
// console.log("矩阵链相乘其最少次数：", frequency);

const result = designSkills.minCoinChangeGreedy([1, 5, 10, 25], 8);
console.log(`找零方案: ${result}`);
const values = [3, 4, 5],
    weights = [2, 3, 4],
    capacity = 6;

// 背包容量为6时, 可以装物品1和物品2以及25%的物品3
console.log("容量为6的背包其解决方案为：", designSkills.knapSackGreedy(capacity, weights, values));

// 迷宫老鼠问题
const RatResult = designSkills.ratInAmaze([
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
    [0, 1, 1, 1]
]);
console.log(RatResult);

// 数独解题器
const sudokuGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
console.log(designSkills.sudokuSolver(sudokuGrid));
