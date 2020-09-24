import { ArrayRepeatedNumber } from "./lib/ArrayRepeatedNumber.ts";
import { StringOperate } from "./lib/StringOperate.ts";

// 获取数组中任意一个重复数字
const arrayRepeatedNumber = new ArrayRepeatedNumber([1, 5, 2, 3, 4, 5, 7]);
// 字符串操作
const stringOperate = new StringOperate();

const result = arrayRepeatedNumber.findRepeated();
if (result !== -1 && result != null) {
    console.log("数组中的任意一个重复数字为：" + result);
}

// 测试去除数组中重复元素函数
const a = arrayRepeatedNumber.delRepeatedElement([12, 6, 8, 9, 1, "aa", "ss", { aa: "22" }, [1, 5, 6, 7]]);
console.log(a);

const result1 = arrayRepeatedNumber.findRepeatedWithArray();
console.log("重复元素：", result1);

const result2 = arrayRepeatedNumber.findNumberWithTDM(
    [
        [1, 2, 8, 9],
        [2, 4, 9, 12],
        [4, 7, 10, 13],
        [6, 8, 11, 15]
    ],
    12
);
console.log(result2);

const str = "hello world, 空格测试";

const result3 = stringOperate.replaceSpacesWithArray(str, "%20");
const result4 = stringOperate.replaceSpacesWithString(str, "20%");

console.log(result3);
console.log(result4);
