import HashMapSeparateChaining from "./lib/HashMapSeparateChaining.ts";

const hashMapSC = new HashMapSeparateChaining();
hashMapSC.put("name","张三");
hashMapSC.put("id",11);
hashMapSC.put("age",22);
hashMapSC.put("phone","09871588");
hashMapSC.remove("id");
console.log(hashMapSC.get("name"));
console.log("判断hashMap中的数据是否为空", hashMapSC.isEmpty());
console.log(hashMapSC.toString());
console.log("使用forEach遍历hashMap中的数据");
hashMapSC.forEach((key,value)=>{
    console.log(`${key} = ${value}`);
})
console.log("获取hashMap中存储的所有key",hashMapSC.keys());
console.log("获取hashMap中存储的所有value",hashMapSC.values());
console.log("判断id是否在hashMap中",hashMapSC.hasKey("id"));
console.log("清空HashMap中的数据");
hashMapSC.clear();
console.log("判断HashMap中的数据是否为空", hashMapSC.isEmpty());
console.log("冲突测试")
hashMapSC.put('Ygritte', 'ygritte@email.com');
hashMapSC.put('Jonathan', 'jonathan@email.com');
hashMapSC.put('Jamie', 'jamie@email.com');
hashMapSC.put('Jack', 'jack@email.com');
hashMapSC.put('Jasmine', 'jasmine@email.com');
hashMapSC.put('Jake', 'jake@email.com');
hashMapSC.put('Nathan', 'nathan@email.com');
hashMapSC.put('Athelstan', 'athelstan@email.com');
hashMapSC.put('Sue', 'sue@email.com');
hashMapSC.put('Aethelwulf', 'aethelwulf@email.com');
hashMapSC.put('Sargeras', 'sargeras@email.com');
console.log(hashMapSC.toString());