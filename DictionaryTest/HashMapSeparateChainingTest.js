import HashMapSeparateChaining from "./lib/HashMapSeparateChaining.ts";

const hashMapSC = new HashMapSeparateChaining();
hashMapSC.put("name","张三");
hashMapSC.put("id",11);
hashMapSC.remove("id");
console.log(hashMapSC.get("name"));
console.log(hashMapSC.toString());