import { ArrayRepeatedNumber } from "./lib/ArrayRepeatedNumber.ts";

// 获取数组中任意一个重复数字
const arrayRepeatedNumber = new ArrayRepeatedNumber([8, 1, 2, 3, 4, 3, 3, 4, 5]);
const result = arrayRepeatedNumber.getRepeated();
if (result !== -1 && result != null) {
    console.log("数组中的任意一个重复数字为：" + result);
}
const a = arrayRepeatedNumber.delRepeatedElement([12, 6, 8, 9, 1, "aa", "ss", { aa: "22" }, [1, 5, 6, 7]]);
console.log(a);
