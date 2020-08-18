import { DesignSkills } from "./lib/DesignSkills.ts";
const designSkills = new DesignSkills();
const result = designSkills.minCoinChange([1, 5, 10, 25], 5);
console.log(result);
