import HashMapSeparateChaining from "./lib/HashMapSeparateChaining.ts";

const hashMapSC = new HashMapSeparateChaining();
hashMapSC.put("name","张三");
console.log(hashMapSC.toString());