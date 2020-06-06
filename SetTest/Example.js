// 并集元素
const A = new Set();
A.add(1);
A.add(2);
A.add(3);
A.add(4);
const B = new Set();
B.add(3);
B.add(5);
B.add(10);
console.log("A和B的并集",new Set([...A,...B]));

// 交集元素
console.log("A和B的交集",new Set([...A].filter(x=>B.has(x))));

// 差集
console.log("A和B的差集",new Set([...A].filter(x => !B.has(x))));