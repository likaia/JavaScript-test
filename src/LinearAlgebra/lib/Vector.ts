// 向量类
export class Vector {
    constructor(private list: number[] = []) {}

    // 获取向量维度
    getDimension(): number {
        return this.list.length;
    }

    /**
     * 获取向量的特定元素
     * @param index 目标元素索引
     */
    getItem(index: number): number {
        return this.list[index];
    }

    /**
     * 向量的加法运算
     * @param another
     */
    add(another: Vector): Vector | string {
        // 向量相加时，要确保其维度与当前维度相等
        if (this.getDimension() === another.getDimension()) {
            const finalList: number[] = [];
            for (let i = 0; i < this.getDimension(); i++) {
                finalList.push(this.getItem(i) + another.getItem(i));
            }
            return new Vector(finalList);
        } else {
            return "维度不相等，无法进行加法运算";
        }
    }

    /**
     * 向量的减法运算
     * @param another
     */
    sub(another: Vector): Vector | string {
        // 与加法运算一样，维度必须相等
        if (this.getDimension() === another.getDimension()) {
            const finalList: number[] = [];
            for (let i = 0; i < this.getDimension(); i++) {
                finalList.push(this.getItem(i) - another.getItem(i));
            }
            return new Vector(finalList);
        } else {
            return "维度不相等，无法进行减法运算";
        }
    }

    /**
     * 向量的数量乘法运算
     * @param K
     */
    mul(K: number): Vector {
        const finalList: number[] = [];
        // 向量的乘法运算规则：用向量的每一个维度去和这个数相乘
        for (let i = 0; i < this.getDimension(); i++) {
            finalList.push(this.getItem(i) * K);
        }

        return new Vector(finalList);
    }

    // 向量取正
    pos(): Vector {
        return this.mul(1);
    }

    // 向量取负
    neg(): Vector {
        return this.mul(-1);
    }

    // 零向量
    public static zero(dim: number): Vector {
        return new Vector(new Array(dim).fill(0));
    }

    // 输出向量
    toStr(): string {
        let str = ``;
        for (let i = 0; i < this.list.length; i++) {
            if (i !== this.list.length - 1) {
                str += `${this.list[i]},`;
            } else {
                str += this.list[i];
            }
        }
        return `(${str})`;
    }
}
