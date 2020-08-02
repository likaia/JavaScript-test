import { Sort } from "./lib/Sort.ts";

const array = [12, 5, 6, 7, 8, 9, 11, 3, 4, 19];
const sort = new Sort(array);
const result = sort.bucketSort(array);
console.log(result.join());
