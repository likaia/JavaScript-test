import { Matrix } from "./lib/Matrix.ts";
import { Vector } from "./lib/Vector.ts";

const list2d = [
    [1.5, 0],
    [0, 2]
];
const matrix = new Matrix(list2d);
console.log(matrix.toStr());
console.log(matrix.shape());
console.log(matrix.getColNum());
console.log(matrix.size());
console.log(matrix.getItem([0, 1]));
console.log(matrix.rowVector(0).toStr());
console.log(matrix.colVector(1));
// 矩阵的加法运算
const list2d2 = [
    [3, 5],
    [5, 8],
    [8, 10]
];
const matrix1 = new Matrix(list2d2);
console.log(matrix.add(matrix1));
console.log(matrix.mul(2));
console.log(matrix.division(2));
console.log(Matrix.zero(5, 5));
// 矩阵与向量相乘
const vector = new Vector([5, 3]);
console.log(matrix.mulVector(vector));
const T = [
    [1.5, 0],
    [0, 2]
];
const P = [
    [0, 4, 5],
    [0, 0, 3]
];
const TMatrix = new Matrix(T);
const PMatrix = new Matrix(P);
console.log(TMatrix.mulMatrix(PMatrix));
