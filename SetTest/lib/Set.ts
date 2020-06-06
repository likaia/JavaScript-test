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
        // 声明并集变量
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    // 交集
    intersection(otherSet: Set<T>) {
        // 声明交集变量
        const intersectionSet = new Set();
        // 获取当前实例集合中的元素
        const values  = this.values();
        // 获取另一个集合中的元素
        const otherValues = otherSet.values();
        // 假设当前实例集合中的元素最多
        let biggerSet = values;
        // 假设另一个元素集合中的元素最少
        let smallerSet = otherValues;
        // 如果另一个集合中的元素个数比当前元素集合中的个数多，则交换变量
        if(otherValues.length - values.length > 0){
            biggerSet = otherValues;
            smallerSet = values;
        }
        // 遍历元素最少的集合数组，节约性能开销
        smallerSet.forEach(value => {
           if (biggerSet.includes(value)){
               intersectionSet.add(value);
           }
        });
        // 返回交集集合
        return intersectionSet;
    }

    // 差集
    difference(otherSet: Set<T>) {
        // 声明差集变量
        const differenceSet = new Set();
        // 遍历当前实例中的集合
        this.values().forEach(value => {
            // 如果当前遍历到元素不存在与另一个集合中，则将档当前元素添加进差集变量里
           if(!otherSet.has(value)){
               differenceSet.add(value);
           }
        });
        // 返回差集变量
        return differenceSet;
    }

    // 子集
    isSubsetOf(otherSet: Set<T>) {
        if(this.size() > otherSet.size()){
            return false;
        }

        let isSubset = true;
        this.values().every(value => {
            if(!otherSet.has(value)){
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}