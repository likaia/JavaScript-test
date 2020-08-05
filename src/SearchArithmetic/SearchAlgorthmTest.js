import { SearchArithmetic } from "./lib/SearchArithmetic.ts";

const array = [7, 8, 1, 2, 3, 5, 12, 13, 16, 19];
const searchArithmetic = new SearchArithmetic(array, 1);
searchArithmetic.binarySearch();
