// 链表需要的辅助类

// 生成一个对象
export class ValuePair{
    private key: any;
    private value: any;
    constructor(key: string,value: any) {
        this.key = key;
        this.value = value;
    }

    toString(){
        return `[#${this.key}: ${this.value}]`;
    }
}