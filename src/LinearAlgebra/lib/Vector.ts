// 向量类
export class Vector {
    constructor(private list: number[] = []) {}

    // 获取向量维度
    getDimension(): number {
        return this.list.length;
    }

    // 向量的长度
    len = this.getDimension();

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

    // 求向量的模
    norm(): number {
        // 对向量的每个维度的值进行平方求和运算
        let sum = 0;
        for (let i = 0; i < this.getDimension(); i++) {
            sum += this.getItem(i) ** 2;
        }
        // 对求出的和进行平方根运算
        return Math.sqrt(sum);
    }

    // 求单位向量
    normalize(): Vector {
        const finalList: number[] = [];
        // 单位向量的求法：用向量中的每个维度的元素除以当前向量的模，将每个求出的元素放进新的向量中，将其返回
        const norm = this.norm();
        if (norm === 0) {
            throw "向量的模不能为0";
        }
        for (let i = 0; i < this.getDimension(); i++) {
            finalList.push(this.getItem(i) / norm);
        }
        return new Vector(finalList);
    }

    // 两个向量的点乘
    dotMul(another: Vector): number | void {
        if (another.getDimension() === this.getDimension()) {
            let final = 0;
            // 两个向量点乘的方法: 将每个向量中的元素互相进行乘法运算，将得到的结果相加
            for (let i = 0; i < this.getDimension(); i++) {
                final += this.getItem(i) * another.getItem(i);
            }
            return final;
        } else {
            console.log("两个向量点乘时其维度必须相等");
        }
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
        return `Vector(${str})`;
    }
}
