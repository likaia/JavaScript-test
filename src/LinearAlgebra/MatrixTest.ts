import { Matrix } from "./lib/Matrix.ts";

const list2d = [
    [1, 3],
    [3, 5],
    [5, 7]
];
const matrix = new Matrix(list2d);
console.log(matrix.toStr());
console.log(matrix.shape());
console.log(matrix.getColNum());
console.log(matrix.size());
console.log(matrix.getItem([0, 1]));
console.log(matrix.rowVector(0).toStr());
console.log(matrix.colVector(1));
