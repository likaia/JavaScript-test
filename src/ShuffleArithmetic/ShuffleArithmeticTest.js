import { ShuffleArithmetic } from "./lib/ShuffleArithmetic.ts";

const array = [4, 5, 6, 1, 2, 3, 4, 5, 8, 9, 0, 11, 22, 41];
const shuffleArithmetic = new ShuffleArithmetic(array);
shuffleArithmetic.fisherYates();
console.log("随机排序后的数组元素", array.join());
