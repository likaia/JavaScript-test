import { ValuePair } from "../../../utils/dictionary-list-models.ts";
import { defaultToString } from "../../../utils/Util.ts";
import { HashMap } from "./HashMap.ts";
import LinkedList from "../../LinkedListTest/lib/LinkedList.ts";

export default class HashMapSeparateChaining<K, V> extends HashMap<K, V> {
    // js没有绝对的私有属性，此处的table与父类的table类型冲突，所以换了变量名
    private tableLink: { [key: number]: LinkedList<ValuePair<K, V>> };

    constructor(protected toStrFn: (key: K) => string = defaultToString) {
        super(toStrFn);
        this.tableLink = {};
    }

    // 重写put方法: 将key & value 存进链表中
    put(key: K, value: V): boolean {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.tableLink[position] == null) {
                // 如果当前要添加元素的位置为空则创建一个链表
                this.tableLink[position] = new LinkedList<ValuePair<K, V>>();
            }
            // 往当前要添加元素的链表中添加当前当前元素
            this.tableLink[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }

    // 重写get方法: 需要从链表中获取valuePair
    get(key: K): V | undefined {
        // 获取参数的hash值
        const position = this.hashCode(key);
        // 获取目标元素位置存储的链表结构元素
        const linkedList = this.tableLink[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            // 获取链表头部数据
            let current = linkedList.getHead();
            while (current != null) {
                // 遍历链表，找到链表中与目标参数相同的数据
                if (current.element.key === key) {
                    // 返回目标key对应的value值
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }

    // 重写remove方法: 需要从链表中移除元素
    remove(key: K): boolean {
        const position = this.hashCode(key);
        // 获取目标元素位置存储的链表结构元素
        const linkedList = this.tableLink[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            // 获取链表头部元素
            let current = linkedList.getHead();
            while (current != null) {
                // 遍历链表，找到与目标元素相同的数据
                if (current.element.key === key) {
                    // 将当前链表中的元素从链表中移除
                    linkedList.remove(current.element);
                    if (linkedList.isEmpty()) {
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

    // 重写clear方法: js没有私有属性，因为继承自HashMap所以table属性会冲突
    clear() {
        this.tableLink = {};
    }

    // 重写keyValues方法：hashMap中存储的是链表，需要从链表中获取valuePair
    keyValues(): ValuePair<K, V>[] {
        const valuePairs = [];
        // 获取tableLink中的所有key并转为int类型
        const keys = Object.keys(this.tableLink).map((item) => parseInt(item));
        for (let i = 0; i < keys.length; i++) {
            const linkedList = this.tableLink[keys[i]];
            if (linkedList != null && !linkedList.isEmpty()) {
                // 遍历链表中的数据，将链表中的数据放进valuePairs中
                let current = linkedList.getHead();
                while (current != null) {
                    valuePairs.push(current.element);
                    current = current.next;
                }
            }
        }
        return valuePairs;
    }
}
