export class ShuffleArithmetic<T> {
    constructor(private array: T[]) {}
    // Fisher-Yates随机算法
    fisherYates(): T[] {
        // 从数组的最后一位向前遍历数组
        for (let i = this.array.length - 1; i > 0; i--) {
            // 计算随机位置,用一个随机数与i+1相加,得出的随机位置一定比当前位置小
            const randomIndex = Math.floor(Math.random() * (i + 1));
            // 交换当前位置的元素和随机位置的元素
            this.swap(i, randomIndex);
        }

        return this.array;
    }

    /**
     * 交换数组的元素
     * @param a
     * @param b
     * @private
     */
    private swap(a: number, b: number) {
        const temp: T = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = temp;
    }
}
