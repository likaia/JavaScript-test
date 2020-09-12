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

    // 矩阵链相乘
    matrixChainOrder(p: number[]): number {
        // 矩阵的长度
        const n = p.length;
        // 辅助矩阵：m存储最优次数
        const m: number[][] = [];
        const s: number[][] = [];

        // 完整填充矩阵s
        for (let i = 0; i <= n; i++) {
            s[i] = [];
            for (let j = 0; j <= n; j++) {
                s[i][j] = 0;
            }
        }

        // 对角线填充矩阵m
        for (let i = 1; i <= n; i++) {
            m[i] = [];
            m[i][i] = 0;
        }

        // 更新矩阵m和s
        for (let l = 2; l < n; l++) {
            for (let i = 1; i <= n - l + 1; i++) {
                // 计算要填充位置的值
                const j = i + l - 1;
                // 假设此处位置的值为最大
                m[i][j] = Number.MAX_SAFE_INTEGER;
                // console.table(m);
                for (let k = 0; k <= j - 1; k++) {
                    // 计算公式：矩阵相乘得到的次数
                    const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                    // 如果计算出来的次数小于刚才假设的最大值就更新m矩阵和s矩阵的元素值
                    if (q < m[i][j]) {
                        // m[i][j]处的值就是计算出来的次数
                        m[i][j] = q;
                        s[i][j] = k;
                    }
                }
            }
        }
        // 打印矩阵相乘组合顺序
        this.printOptimalParenthesis(s, 1, n - 1);
        // m矩阵的第一行第i-1位置的值就是我们要的矩阵链相乘最少次数
        return m[1][n - 1];
    }

    // 矩阵链相乘解决方案
    printOptimalParenthesis(s: number[][], i: number, j: number): void {
        if (i === j) {
            console.log("A[" + i + "]");
        } else {
            console.log("(");
            this.printOptimalParenthesis(s, i, s[i][j]);
            this.printOptimalParenthesis(s, s[i][j] + 1, j);
            console.log(")");
        }
    }

    // 贪心算法: 最少硬币找零
    minCoinChangeGreedy(coins: number[], amount: number): number[] {
        // 找零方案
        const change: number[] = [];
        // 总金额
        let total = 0;
        for (let i = coins.length; i >= 0; i--) {
            // 当前取出的面值
            const coin = coins[i];
            // 当前取出的面值+总金额必须小于找零金额
            while (total + coin <= amount) {
                // 将当前面值放进找零方案中
                change.push(coin);
                // 总金额+当前取出的面值
                total += coin;
            }
        }
        // 返回找零方案
        return change;
    }

    /**
     * 贪心算法: 背包问题
     * @param capacity 背包容量
     * @param weights 物品重量
     * @param values 物品价值
     */
    knapSackGreedy(
        capacity: number,
        weights: number[],
        values: number[]
    ): { val: number; compose: ({ dart: boolean; scale: number; id: number } | { dart: boolean; id: number })[] } {
        const n = values.length;
        // 存储解决方案
        const compose = [];
        // 已装入背包的物品总重量
        let load = 0;
        // 已装入背包的物品总价值
        let val = 0;
        for (let i = 0; i < n && load < capacity; i++) {
            // 物品可以完整的放入背包
            if (weights[i] <= capacity - load) {
                // 将物品的价值计入背包已装入物品的总价值
                val += values[i];
                // 将物品的重量计入背包已装入物品的总重量
                load += weights[i];
                // 当前物品可以完整放入，将物品编号放入组合方案中
                compose.push({ id: i, dart: false });
            } else {
                // 物品无法完整的放入背包，计算能够装入部分的比例
                const r = (capacity - load) / weights[i];
                // 将计算出的物品价值计入背包已装入物品的总价值
                val += r * values[i];
                // 将物品的重量计入背包已装入物品的总重量
                load += weights[i];
                // 当前物品无法完整放入，将物品编号和可放物品比例放入组合方案中
                compose.push({ id: i, dart: true, scale: r });
            }
        }

        // 返回物品总价值
        return { val: val, compose: compose };
    }

    /**
     *  回溯算法：迷宫老鼠问题
     *
     * @param maze 迷宫
     */
    ratInAmaze(maze: number[][]): number[][] | string {
        // 解决方案
        const solution: number[][] = [];
        for (let i = 0; i < maze.length; i++) {
            solution[i] = [];
            for (let j = 0; j < maze[i].length; j++) {
                solution[i][j] = 0;
            }
        }
        console.log("初始化后的解决方案", solution);
        // 寻找路径
        if (this.findPath(0, 0, maze, solution)) {
            // 返回解决方案
            return solution;
        }
        // 无解
        return "此迷宫无解";
    }

    // 寻找路径
    findPath(x: number, y: number, maze: number[][], solution: number[][]): boolean {
        const n = maze.length;
        // 递归基准条件：老鼠走到了迷宫的尽头
        if (x === n - 1 && y === n - 1) {
            // 将最后一个位置标记为路径的一部分
            solution[x][y] = 1;
            return true;
        }
        // 判断老鼠能否安全移动到该位置
        if (this.isSafe(maze, x, y)) {
            // 该位置可以移动，将其标注为可移动
            solution[x][y] = 1;
            // 沿着迷宫的行移动
            if (this.findPath(x + 1, y, maze, solution)) {
                return true;
            }
            // 沿着迷宫的列移动
            if (this.findPath(x, y + 1, maze, solution)) {
                return true;
            }
            // 水平和垂直都无法移动，将这步路径标注为不可移动
            solution[x][y] = 0;
            // 回溯，即将当前层从递归栈中移除，尝试另一种解决方案
            return false;
        }
        // 所有移动方案都尝试完毕，都无法移动，则退出当前递归
        return false;
    }

    // 验证此位置是否能走
    isSafe(maze: number[][], x: number, y: number): boolean {
        const n = maze.length;
        // x和y必须大于等于0且迷宫的第x行y列不能为0老鼠就可以走
        return x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0;
    }
}
