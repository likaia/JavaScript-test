import Set from "./lib/Set.ts";

const set = new Set();
set.add(11);
set.add(12);
set.add(13);
set.delete(11);
console.log(set.size())
console.log("获取集合中的元素",set.values());
set.clear();
console.log("获取集合大小",set.size());

// 集合运算
const A = new Set();
A.add(10);
A.add(11);
A.add(12);
A.add(13);
A.add(1);
A.add(2);
const B = new Set();
B.add(1);
B.add(2);
B.add(3);
// 求A和B的并集
console.log("A和B的并集",A.union(B).values());
// 求A和B的交集
console.log("A和B的交集",A.intersection(B).values());
//求A和B的差集
console.log("A和B的差集",A.difference(B).values());

// 求C是否为D的子集
const C = new Set();
C.add(1);
C.add(2);
C.add(3);
C.add(4);
C.add(5);
const D = new Set();
D.add(1);
D.add(2);
D.add(3);
D.add(9)
console.log(D.isSubsetOf(C));