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
                    newMin = makeChange(newAmount);
                }

                if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
                    min = [coin].concat(newMin);
                }
            }
            return (cache[amount] = min);
        };
        return makeChange(amount);
    }
}
