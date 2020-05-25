// @ts-ignore
import {defaultEquals} from "../../utils/Util.ts";
// @ts-ignore
import {Node} from "../../utils/linked-list-models.ts";
// 定义验证函数要传的参数和返回结果
interface equalsFnType {
    (a: any,b: any) : boolean;
}

export default class LinkedList{
    // 声明链表内需要的变量并定义其类型
    private count: number;
    private next: any;
    private equalsFn: equalsFnType;
    private head: any;

    constructor(equalsFn = defaultEquals) {
        // 初始化链表内部变量
        this.count = 0;
        this.next = undefined;
        this.equalsFn = equalsFn;
        this.head = null;
    }

    // 链表尾部添加元素
    push(element: any) {
        //　创建节点，将元素当作值传入
        const node = new Node(element);
        let current;
        if(this.head==null){
            // 链表为空，让head指向node，下一个node元素就会为undefined
            this.head = node;
        }else{
            // 链表不为空，我们只能拿到链表中第一个元素的引用
            current = this.head;
            // 我们需要循环访问链表
            while (current.next !=null){
                // 赋值
                current = current.next;
            }
            // 此时已经得到了链表的最后一个元素(null)，将链表的下一个元素指定为当前node结点。
            current.next = node;
        }
        // 链表长度自增
        this.count++;
    }

    // 根据特定位置移除链表中的元素
    removeAt(index) {
        // 边界判断: 参数是否有效
        if(index >= 0 && index < this.count){
            // 获取当前链表头部元素
            let current = this.head;
            // 移除第一项
            if(index === 0){
                this.head = current.next;
            }else{
                let previous;
                // 遍历链表
                for (let i = 0; i < index; i++){
                    previous = current;
                    current = current.next;
                }
                // 链接previous和current的下一项,跳过current做到移除它的目的
                previous.next = current.next;
            }
            this.count--;
            return current.element
        }
        return undefined;
    }

}
