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

    /**
     * 最长公共子序列
     * @param wordX 字符串1
     * @param wordY 字符串2
     */
    lcs(wordX: string, wordY: string): number {
        // 获取两个子序列的长度
        const m = wordX.length;
        const n = wordY.length;
        // 声明并初始化二维数组，用于存放矩阵
        const l: number[][] = [];
        for (let i = 0; i <= m; i++) {
            l[i] = [];
            for (let j = 0; j <= n; j++) {
                l[i][j] = 0;
            }
        }

        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                if (i === 0 || j === 0) {
                    // i为0或者j为0，此处的格子就填充为0
                    l[i][j] = 0;
                } else if (wordX[i - 1] === wordY[j - 1]) {
                    // 字符串1的i-1位置的值等于字符串2的j-1位置的值
                    l[i][j] = l[i - 1][j - 1] + 1;
                } else {
                    // 否则，取出a、b位置的值，选出一个较大值进行填充
                    const a = l[i - 1][j];
                    const b = l[i][j - 1];
                    l[i][j] = a > b ? a : b;
                }
            }
        }
        // 最后一个格子即最长公共子序列的长度
        return l[m][n];
    }

    /**
     * 最长公共子序列解决方案
     * @param wordX
     * @param wordY
     */
    lcsSolution(wordX: string, wordY: string): string {
        // 获取两个子序列的长度
        const m = wordX.length;
        const n = wordY.length;
        // 声明并初始化二维数组，用于存放矩阵
        const l: number[][] = [];
        // 存放用于推导组合的矩阵
        const solution: string[][] = [];
        for (let i = 0; i <= m; i++) {
            l[i] = [];
            solution[i] = [];
            for (let j = 0; j <= n; j++) {
                l[i][j] = 0;
                solution[i][j] = "0";
            }
        }

        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                if (i === 0 || j === 0) {
                    l[i][j] = 0;
                } else if (wordX[i - 1] === wordY[j - 1]) {
                    l[i][j] = l[i - 1][j - 1] + 1;
                    // 如果相等则填充diagonal
                    solution[i][j] = "diagonal";
                } else {
                    const a = l[i - 1][j];
                    const b = l[i][j - 1];
                    l[i][j] = a > b ? a : b;
                    // 如果相等就填充top否则填充left
                    solution[i][j] = l[i][j] == l[i - 1][j] ? "top" : "left";
                }
            }
        }
        // 求组合方案
        return DesignSkills.getSolution(solution, wordX, m, n);
    }

    /**
     * 根据最长公共子序列矩阵推导其组合方案
     * @param solution 最长公共子序列矩阵
     * @param wordX 字符串1
     * @param m 矩阵的x轴指向
     * @param n 矩阵的y轴指向
     * @private
     */
    private static getSolution(solution: string[][], wordX: string, m: number, n: number): string {
        let a = m;
        let b = n;
        let x = solution[a][b];
        let answer = "";
        while (x !== "0") {
            if (solution[a][b] === "diagonal") {
                // 相等就将其取出
                answer = wordX[a - 1] + answer;
                a--;
                b--;
            } else if (solution[a][b] === "left") {
                b--;
            } else if (solution[a][b] === "top") {
                a--;
            }
            // 重新赋值，继续下一轮循环
            x = solution[a][b];
        }
        // 返回组合方案
        return answer;
    }
}
