import HashMapLinearProbing from "./lib/HashMapLinearProbing.ts";

const hashMapLP = new HashMapLinearProbing();
console.log("冲突元素删除测试");
hashMapLP.put('Ygritte', 'ygritte@email.com');
hashMapLP.put('Jonathan', 'jonathan@email.com');
hashMapLP.put('Jamie', 'jamie@email.com');
hashMapLP.put('Jack', 'jack@email.com');
hashMapLP.put('Jasmine', 'jasmine@email.com');
hashMapLP.put('Jake', 'jake@email.com');
hashMapLP.put('Nathan', 'nathan@email.com');
hashMapLP.put('Athelstan', 'athelstan@email.com');
hashMapLP.put('Sue', 'sue@email.com');
hashMapLP.put('Aethelwulf', 'aethelwulf@email.com');
hashMapLP.put('Sargeras', 'sargeras@email.com');
// hashMapLP.remove("Ygritte");
hashMapLP.remove("Jonathan");
console.log(hashMapLP.toString());