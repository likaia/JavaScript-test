import {HashMap} from "./lib/HashMap.ts";

const hashMap = new HashMap();
hashMap.put("name","张三");
hashMap.put("id",1);
console.log(hashMap.get("id"));