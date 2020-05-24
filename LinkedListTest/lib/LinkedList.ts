import {defaultEquals} from "../../utils/Util";
import {Node} from "../../utils/linked-list-models";
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

    push(element: any) {
        const node = new Node(element);
        let current;
        if(this.head==null){
            this.head = node;
        }else{
            current = this.head;
            while (current.next !=null){
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
}
