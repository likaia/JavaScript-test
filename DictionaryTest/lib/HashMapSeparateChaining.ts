import {ValuePair} from "../../utils/dictionary-list-models.ts";
import {defaultToString} from "../../utils/Util.ts";
import {HashMap} from "./HashMap.ts";
import LinkedList from "../../LinkedListTest/lib/LinkedList.ts";

export default class HashMapSeparateChaining<K,V> extends HashMap<K, V> {
    private tableLink:{ [key: number]: LinkedList<ValuePair<K, V>> };
    constructor(protected toStrFn: (key: K) => string = defaultToString) {
        super(toStrFn);
        this.tableLink = {};
    }

    put(key: K, value: V): boolean {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.tableLink[position] == null){
                // 如果当前要添加元素的位置为空则创建一个链表
                this.tableLink[position] = new LinkedList<ValuePair<K, V>>();
            }
            // 往当前要添加元素的链表中添加当前当前元素
            this.tableLink[position].push(new ValuePair(key,value));
            return true;
        }
        return false;
    }

    // 获取链表中的值 
    get(key: K): V | undefined {

        const position = this.hashCode(key);
        const linkedList = this.tableLink[position];
        if (linkedList !=null && !linkedList.isEmpty()){
            let current = linkedList.getHead();
            while (current != null){
                if (current.element.key === key){
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }

    remove(key: K): boolean {
        const position = this.hashCode(key);
        const linkedList = this.tableLink[position];
        if (linkedList != null && !linkedList.isEmpty()){
            let current = linkedList.getHead();
            while (current != null){
                if (current.element.key === key){
                    linkedList.remove(current.element);
                    if (linkedList.isEmpty()){
                        delete this.tableLink[position];
                    }
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.tableLink);
        console.log(keys);
        return ``;
    }
}