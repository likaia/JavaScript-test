import { DesignSkills } from "./lib/DesignSkills.ts";
const designSkills = new DesignSkills();
const result = designSkills.minCoinChange([1, 5, 10, 25], 8);
console.log(result);

const values = [3, 4, 5],
    weights = [2, 3, 4],
    capacity = 5,
    n = values.length;
console.log(designSkills.knapSack(capacity, weights, values, n));
