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
        // 获取参数的hash值
        const position = this.hashCode(key);
        // 获取目标元素位置存储的链表结构元素
        const linkedList = this.tableLink[position];
        if (linkedList !=null && !linkedList.isEmpty()){
            // 获取链表头部数据
            let current = linkedList.getHead();
            while (current != null){
                // 遍历链表，找到链表中与目标参数相同的数据
                if (current.element.key === key){
                    // 返回目标key对应的value值
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }

    remove(key: K): boolean {
        const position = this.hashCode(key);
        // 获取目标元素位置存储的链表结构元素
        const linkedList = this.tableLink[position];
        if (linkedList != null && !linkedList.isEmpty()){
            // 获取链表头部元素
            let current = linkedList.getHead();
            while (current != null){
                // 遍历链表，找到与目标元素相同的数据
                if (current.element.key === key){
                    // 将当前链表中的元素从链表中移除
                    linkedList.remove(current.element);
                    if (linkedList.isEmpty()){
                        // 链表为空，删除目标位置元素
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
        console.log(this.tableLink);
        return ``;
    }
}