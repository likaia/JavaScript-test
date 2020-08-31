// 向量类
export class Vector {
    constructor(private list: number[] = []) {}

    /**
     * 输出向量
     */
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
