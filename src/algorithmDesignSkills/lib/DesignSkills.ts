export class DesignSkills {
    /**
     *
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
}
