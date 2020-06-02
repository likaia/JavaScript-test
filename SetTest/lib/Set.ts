interface setItemsType<T> {
    [propName: string]: T;
}

export default class Set<T>{
    private items: setItemsType<T>;
    constructor() {
        this.items = {};
    }

    // 判断元素是否在集合中
    has(element: any){
        // Object原型有hasOwnProperty方法用于判断对象是否有特定属性
        return Object.prototype.hasOwnProperty.call(this.items,element);
    }

    // 集合中添加元素
    add(element: any){
        if(!this.has(element)){
            this.items[element] = element;
            return true;
        }
        return false;
    }

    // 删除集合中的元素
    delete(element: any){
        if(this.has(element)){
            delete this.items[element];
            return true;
        }
        return false;
    }

    // 清空集合
    clear(){
        this.items = {};
    }

    // 获取集合大小
    size(){
        let count = 0;
        for (let key in this.items){
            if(this.items.hasOwnProperty(key)){
                count++;
            }
        }
        return count;
    }

    // 获取集合中的所有元素
    values(){
        let values = [];
        for (let key in this.items){
            if(this.items.hasOwnProperty(key)){
                values.push(key);
            }
        }
        return values;
    }

    // 并集
    union(otherSet: Set<T>){
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

}