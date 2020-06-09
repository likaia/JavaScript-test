import {ValuePair} from "../../utils/dictionary-list-models.ts";
import {defaultToString} from "../../utils/Util.ts";
import Map from "./Map.ts";

export class HashMap<K,V> implements Map<K, V>{
    private table:{ [key:string]: ValuePair<K, V> };
    constructor(private toStrFn: (key: K) => string = defaultToString) {
        this.table = {};
    }

    put(key: K, value: V): boolean {
        if (key != null && value != null){
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    // 生成哈希码
    hashCode(key: K): number {
        return this.loseloseHashCode(key);
    }

    // 生成散列哈希码
    loseloseHashCode(key: K): number {
        if (typeof key === "number") {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++){
            // 获取每个字符的ASCII码将其拼接至hash中
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }

    clear(): void {
    }

    forEach(callbackFn: (key: K, value: V) => any): void {
    }

    get(key: K): V|undefined {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    hasKey(key: K): boolean {
        return false;
    }

    isEmpty(): boolean {
        return false;
    }

    keyValues(): ValuePair<K, V>[] {
        return [];
    }

    keys(): K[] {
        return [];
    }

    remove(key: K): boolean {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null){
            delete this.table[hash];
            return true;
        }
        return false;
    }

    size(): number {
        return 0;
    }

    values(): V[] {
        return [];
    }
}