import Set from "./lib/Set.ts";

const set = new Set();
set.add(11);
set.add(12);
set.add(13);
set.delete(11);
console.log(set.size())
console.log(set.values());

const A = new Set();
A.add(10);
A.add(11);
A.add(12);
A.add(13);

const B = new Set();
B.add(1);
B.add(2);
B.add(3);
// 求A和B的并集
console.log(A.union(B));