import Dictionary from "./lib/Dictionary.ts";

const dictionary = new Dictionary();
dictionary.set("name","张三");
dictionary.set("age",20);
dictionary.set("id",198);
console.log("判断name是否在dictionary中",dictionary.hasKey("name"));
// 移除名为id的key
dictionary.remove("id");
console.log("判断id是否为dictionary中",dictionary.hasKey("id"));
console.log("将字典中存储的数据转为字符串",dictionary.toString())
// 获取dictionary中名为name的值
console.log("dictionary中名为name的值",dictionary.get("name"));
// 获取字典中所有存储的值
console.log("dictionary中所有存储的值",dictionary.keyValues());
// 获取字典中所有的键
console.log("dictionary中所有存储的键",dictionary.keys());
// 获取字典中所有的值
console.log("dictionary中所有存储的值",dictionary.values());
// 迭代字典中的每个键值对
const obj = {};
dictionary.forEach(function (key,value) {
    obj[key] = value;
})
console.log(obj)