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
        for (let i = 0; i < this.getRowNum(); i++) {
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

    /**
     * 加法运算
     * @param another 另一个矩阵
     * @return Matrix 新的矩阵
     */
    add(another: Matrix): Matrix | void {
        // 两个矩阵相加，其大小必须相等
        if (this.size() === another.size()) {
            const finalList: number[][] = [];
            // 将矩阵的每个元素相加，构成新的矩阵
            for (let i = 0; i < this.getRowNum(); i++) {
                const row: number[] = [];
                for (let j = 0; j < this.getColNum(); j++) {
                    // 相加每个元素
                    row.push(this.getItem([i, j]) + another.getItem([i, j]));
                }
                // 构建新的矩阵
                finalList.push(row);
            }
            return new Matrix(finalList);
        } else {
            console.log("矩阵相加，其大小必须相等");
        }
    }

    /**
     * 减法运算
     * @param another 另一个矩阵
     * @return Matrix 新的矩阵
     */
    sub(another: Matrix): Matrix | void {
        // 两个矩阵相加，其大小必须相等
        if (this.size() === another.size()) {
            const finalList: number[][] = [];
            // 将矩阵的每个元素相加，构成新的矩阵
            for (let i = 0; i < this.getRowNum(); i++) {
                const row: number[] = [];
                for (let j = 0; j < this.getColNum(); j++) {
                    // 相加每个元素
                    row.push(this.getItem([i, j]) - another.getItem([i, j]));
                }
                // 构建新的矩阵
                finalList.push(row);
            }
            return new Matrix(finalList);
        } else {
            console.log("矩阵相减，其大小必须相等");
        }
    }

    /**
     * 矩阵数量乘法
     * @param K 目标值
     * @return Matrix 新的矩阵
     */
    mul(K: number): Matrix {
        const finalList: number[][] = [];
        // 运算规则: 用矩阵中每个向量的元素去乘以目标数量，返回新的矩阵
        for (let i = 0; i < this.getRowNum(); i++) {
            const row: number[] = [];
            for (let j = 0; j < this.getColNum(); j++) {
                row.push(this.getItem([i, j]) * K);
            }
            finalList.push(row);
        }
        // 构建新的矩阵并返回
        return new Matrix(finalList);
    }

    /**
     * 矩阵数量除法
     * @param K 目标值
     * @return Matrix 新的矩阵
     */
    division(K: number): Matrix {
        return this.mul(1 / K);
    }

    /**
     * 创建零矩阵
     * @param r 行数
     * @param c 列数
     * @return Matrix 构建好的矩阵
     */
    static zero(r: number, c: number): Matrix {
        const finalList: number[][] = [];
        for (let i = 0; i < r; i++) {
            const row = [];
            for (let j = 0; j < c; j++) {
                row.push(0);
            }
            finalList.push(row);
        }
        return new Matrix(finalList);
    }

    // 矩阵取正
    pos(): Matrix {
        return this.mul(1);
    }

    // 矩阵取负
    neg(): Matrix {
        return this.mul(-1);
    }
    // 输出矩阵
    toStr(): string {
        return `Matrix(${this.twoDimArray})`;
    }
}
