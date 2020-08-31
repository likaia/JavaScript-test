import { Vector } from "./lib/Vector.ts";

const list = [5, 10];
const vector = new Vector(list);
console.log(vector.toStr());
const list1 = [15, 5];
const vector1 = new Vector(list1);
console.log(vector.add(vector1).toStr());
console.log(vector1.sub(vector).toStr());
console.log(vector.mul(3).toStr());
console.log(vector.pos().toStr());
console.log(vector.neg().toStr());
console.log(Vector.zero(4));
const zero2 = Vector.zero(2);
console.log(vector.add(zero2).toStr());
