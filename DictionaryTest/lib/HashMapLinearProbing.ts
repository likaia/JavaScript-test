import {HashMap} from "./HashMap.ts";
import {ValuePair} from "../../utils/dictionary-list-models.ts";

export default class HashMapLinearProbing<K,V> extends HashMap<K, V>{
    constructor() {
        super();
    }

    put(key: K, value: V): boolean {
        if (key != null && value!= null){
            const position = this.hashCode(key);
            console.log(`当前插入元素key: ${key}, hash = ${position}`)
            // 判断当前要插入的位置在表中是否被占据
            if (this.table[position] == null){
                // 当前位置没有被占据，将Key & value放进ValuePair中赋值给当前表中要插入位置的元素
                this.table[position] = new ValuePair(key,value);
            } else{
                // 位置被占据，递增index直至找到没有被占据的位置
                let index = position + 1;
                while (this.table[index] != null){
                    index++;
                }
                // 找到没有被占据的位置，将Key & value放进ValuePair中赋值给当前表中要插入位置的元素
                this.table[index] = new ValuePair(key,value);
            }
            return true;
        }
        return false;
    }

    get(key: K): V | undefined {
        const position = this.hashCode(key);
        if(this.table[position] != null) {
            // 如果当前位置元素的key等于目标元素的key直接返回当前位置元素的value
            if (this.table[position].key === key){
                return this.table[position].value;
            }
            // 位置递增直至找到我们要找的元素或者找到一个空位置
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key){
                index++;
            }
            // 递增结束后，判断当前表中index的key是否等于目标key
            if (this.table[index] != null && this.table[index].key === key){
                return this.table[index].value;
            }
        }
        return undefined;
    }

    remove(key: K): boolean {
        const position = this.hashCode(key);
        if (this.table[position] != null){
            if (this.table[position].key === key){
                delete this.table[position];
                // 删除后，验证本次删除是否有副作用，调整元素位置
                this.verifyRemoveSideEffect(key,position);
                return true;
            }
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key){
                index++;
            }
            if (this.table[index] != null && this.table[index].key === key){
                delete this.table[index];
                this.verifyRemoveSideEffect(key,index);
                return true;
            }
        }
        return false;
    }

    // 验证删除操作是否有副作用
    private verifyRemoveSideEffect(key: K,removedPosition: number){
        // 计算被删除key的哈希值
        const hash = this.hashCode(key);
        // 从被删除元素位置的下一个开始遍历表直至找到一个空位置
        // 当找到一个空位置后即表示元素在合适的位置上不需要移动
        let index = removedPosition + 1;
        while (this.table[index] != null){
            // 计算当前遍历到的元素key的hash值
            const posHash = this.hashCode(this.table[index].key);
            console.log(`当前遍历到的元素的hash= ${posHash} , 上一个被移除key的hash = ${removedPosition}`)
            if (posHash <= hash || posHash <= removedPosition){
                // 如果当前遍历到的元素的哈希值小于等于被删除元素的哈希值或者小于等于上一个被移除key的哈希值(removedPosition)
                // 需要将当前元素移动至removedPosition位置
                console.log(`调整元素位置: ${removedPosition} = ${index}`);
                this.table[removedPosition] = this.table[index];
                // 移动完成后，删除当前index位置的元素
                delete this.table[index];
                // 更新removedPosition的值为index
                removedPosition = index;
            }
            index++;
        }
    }
}