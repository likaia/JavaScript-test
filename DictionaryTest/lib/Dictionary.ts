import {defaultToString} from "../../utils/Util.ts";
import {ValuePair} from "../../utils/dictionary-list-models.ts";

interface callbackFnType {
    (key: string,value: any): any;
}

export default class Dictionary<K,V>{
    private table: { [key:string]: ValuePair<K,V> };

    constructor(private toStrFn: (key: K) => string = defaultToString) {
        this.table = {};
    }

    // 判断字典中是否包含某个key
    hasKey(key: K){
        return this.table[this.toStrFn(key)] != null;
    }

    // 向字典中添加元素
    set(key: K, value: V){
        if(key != null && value != null){
            // 将key转为字符串，字典中需要的key为字符串形式
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key,value);
            return true;
        }
        return false;
    }

    // 从字典中移除一个值
    remove(key: K) {
        if (this.hasKey(key)){
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }

    // 从字典中获取一个值
    get(key: K) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    // 获取字典中存储的所有对象
    keyValues(): ValuePair<K, V>[] {
        /* 使用ES2017引入的Object.values方法可以直接获取对象里存储的所有对应key的value值存进数组中 */
        // return (<any>Object).values(this.table);
        const valuePairs = [];
        for (const key in this.table){
            if (this.table.hasOwnProperty(key) && this.hasKey(key)){
                valuePairs.push(this.table[key]);
            }
        }
        return valuePairs;
    }

    // 获取字典中的所有键
    keys(): K[] {
        // 可以直接使用map获取对象的key
        // return this.keyValues().map(valuePair=> valuePair.key);
        const keys = [];
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++){
            keys.push(valuePairs[i].key);
        }
        return keys;
    }

    // 获取字典中的所有值
    values(): V[] {
        const values = [];
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++){
            values.push(valuePairs[i].value);
        }
        return values;
    }

    // 迭代字典中的每个键值对
    forEach(callbackFn: (key: K, value: V) => any){
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++){
            const result = callbackFn(valuePairs[i].key,valuePairs[i].value);
            if (result === false){
                break;
            }
        }
    }

    size() {
        return this.keyValues().length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.table = {};
    }

    // 将字典中的数据转为字符串
    toString() {
        if (this.isEmpty()){
            return '';
        }

        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++){
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }

}