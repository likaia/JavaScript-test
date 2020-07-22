import {HashMap} from "./lib/HashMap.ts";

const hashMap = new HashMap();
hashMap.put("name", "张三");
hashMap.put("id", 1);
hashMap.put("class", "产品");
console.log("判断class是否存在与HashMap中", hashMap.hasKey("class"));
hashMap.remove("id");
console.log("判断id是否存在于HashMap中", hashMap.hasKey("id"))
console.log(hashMap.get("name"));
hashMap.forEach(((key, value) => {
    console.log(key +"="+ value);
}))
console.log("判断HashMap中的数据是否为空",hashMap.isEmpty());
console.log("输出HashMap中所有key对应的value",hashMap.keyValues());
console.log("获取HashMap中的所有key值",hashMap.keys());
console.log("获取HashMap中的所有Value值",hashMap.values());
console.log("获取HashMap的大小",hashMap.size());
console.log("HashMap中的数据转字符串输出",hashMap.toString());
console.log("清空HashMap中的数据");
hashMap.clear();
// 测试hash值冲突问题
hashMap.put('Ygritte', 'ygritte@email.com');
hashMap.put('Jonathan', 'jonathan@email.com');
hashMap.put('Jamie', 'jamie@email.com');
hashMap.put('Jack', 'jack@email.com');
hashMap.put('Jasmine', 'jasmine@email.com');
hashMap.put('Jake', 'jake@email.com');
hashMap.put('Nathan', 'nathan@email.com');
hashMap.put('Athelstan', 'athelstan@email.com');
hashMap.put('Sue', 'sue@email.com');
hashMap.put('Aethelwulf', 'aethelwulf@email.com');
hashMap.put('Sargeras', 'sargeras@email.com');
console.log(hashMap.toString());