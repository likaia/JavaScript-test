// 矩阵类
import { Vector } from "./Vector.ts";

export class Matrix {
    constructor(private twoDimArray: number[][]) {}

    /**
     * 矩阵形状
     * @returns [x,y] x行，y列
     */
    shape(): number[] {
        // 矩阵的长度就是矩阵的行数，矩阵中每个向量的维度就是其列数都相等，所以取其第0号元素的作为列数
        return [this.twoDimArray.length, this.twoDimArray[0].length];
    }

    // 获取矩阵行数
    getRowNum(): number {
        return this.shape()[0];
    }

    // 获取矩阵列数
    getColNum(): number {
        return this.shape()[1];
    }

    // 矩阵元素个数
    size(): number {
        const shape = this.shape();
        return shape[0] * shape[1];
    }

    // 矩阵的长度，即：获取矩阵行数
    len = this.getRowNum();

    // 获取矩阵的行向量
    rowVector(index: number): Vector {
        return new Vector(this.twoDimArray[index]);
    }

    // 获取矩阵的列向量
    colVector(index: number): Vector {
        // 存放指定列的元素
        const finalList: number[] = [];
        for (let i = 0; i < this.twoDimArray.length; i++) {
            // 取出矩阵的每一行
            const row = this.twoDimArray[i];
            // 取出每一行中的指定列，将其存起来
            finalList.push(row[index]);
        }
        // 返回向量
        return new Vector(finalList);
    }

    // 获取矩阵中的元素
    getItem(position: number[]): number {
        return this.twoDimArray[position[0]][position[1]];
    }

    // 输出矩阵
    toStr(): string {
        return `Matrix(${this.twoDimArray})`;
    }
}
