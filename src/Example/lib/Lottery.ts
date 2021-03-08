export default class Lottery {
    // 抽奖人数
    private readonly peoples: string[];
    // 奖品数量
    private readonly number: number;
    // 抽奖结果
    private result: string[];
    constructor(peoples: string[], number: number) {
        this.peoples = peoples;
        this.number = number;
        this.result = [];
    }

    // 开始抽奖
    public start(): void {
        if (this.number > this.peoples.length) {
            throw "奖品数量大于抽奖人数";
        }
        for (let i = 0; i < this.number; i++) {
            // 取索引值，0到样本数组元素个数，向下取整
            const index = Math.floor(Math.random() * this.peoples.length);
            this.result.push(this.peoples[index]);
            // 已取的元素去掉，进入下一次循环
            this.peoples.splice(index, 1);
        }
    }

    // 获取抽奖结果
    public getResult(): string {
        return `中奖人：${this.result.toString()}`;
    }
}
