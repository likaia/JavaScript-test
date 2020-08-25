export class DesignSkills {
    /**
     * 最少硬币找零
     * @param coins 硬币面额
     * @param amount 找零总金额
     */
    minCoinChange(coins: number[], amount: number): number[] {
        // 记忆化技巧，目的是更小且不重复计算值
        const cache: number[][] = [];
        const makeChange = (amount: number) => {
            // 如果amount为false时直接返回空数组
            if (!amount) {
                return [];
            }
            // 如果结果已缓存则直接返回结果
            if (cache[amount]) {
                return cache[amount];
            }
            let min: number[] = [],
                newMin: number[] = [],
                newAmount: number;
            for (let i = 0; i < coins.length; i++) {
                const coin = coins[i];
                newAmount = amount - coin;
                if (newAmount >= 0) {
                    // 将newAmount加入递归栈
                    newMin = makeChange(newAmount);
                }

                // 递归执行完成，条件如果满足，就将当前硬币
                if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
                    // 取出当前递归栈中保存的coin值，将其与newMin数组进行拼接，将结果赋值给min
                    min = [coin].concat(newMin);
                }
            }
            // 将min赋值给cache[amount]，将结果返回，其结果就是当前栈的返回值，即newMin的值
            return (cache[amount] = min);
        };
        return makeChange(amount);
    }

    /**
     * 背包问题
     * 即: 给定一个固定大小、能够携重量w的背包，以及一组有价值和重量的物品，找出一个最佳解决方案，使得装入背包的物品的总重量不超过w,且总价值最大
     * @param capacity 背包容量
     * @param weights 物品的重量
     * @param values 物品的价值
     * @param n 物品数量
     */
    knapSack(capacity: number, weights: number[], values: number[], n: number): number {
        // 声明并初始化需要寻找解决方案的矩阵
        const kS: number[][] = [];
        for (let i = 0; i <= n; i++) {
            kS[i] = [];
        }

        for (let i = 0; i <= n; i++) {
            for (let w = 0; w <= capacity; w++) {
                if (i === 0 || w === 0) {
                    // 忽略矩阵的第一列和第一行，只处理索引不为0的列和行
                    kS[i][w] = 0;
                } else if (weights[i - 1] <= w) {
                    // 物品i的重量必须小于约束
                    const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
                    const b = kS[i - 1][w];
                    console.log(`i = ${i} :( a = ${a} , b = ${b})`);
                    // 当找到可以构成解决方案的物品时，选择价值最大的那个
                    kS[i][w] = a > b ? a : b;
                } else {
                    // 总重量超出背包能够携带的重量，忽略它用之前的值
                    kS[i][w] = kS[i - 1][w];
                }
            }
        }

        DesignSkills.findValues(n, capacity, kS, weights, values);
        return kS[n][capacity];
    }

    /**
     * 寻找背包物品可组成方案组合
     * @param n 物品数量
     * @param capacity 背包容量
     * @param kS 背包最大价值矩阵
     * @param weights 物品的重量
     * @param values 物品的价值
     * @private
     */
    private static findValues(n: number, capacity: number, kS: number[][], weights: number[], values: number[]): void {
        let i = n;
        let k = capacity;
        console.log("构成解的物品");
        // 物品数量和背包容量都大于0就执行循环
        while (i > 0 && k > 0) {
            if (kS[i][k] !== kS[i - 1][k]) {
                // kS[i][k]位置的值不等于kS[i-1][k]位置的值就是一种方案,将其取出
                console.log(`物品 ${i} 可以是解的一部分 w,v: ${weights[i - 1]}, ${values[i - 1]};`);
                // 取出后i与k重新赋值
                i--;
                k -= kS[i][k];
            } else {
                // 向上找
                i--;
            }
        }
    }
}
