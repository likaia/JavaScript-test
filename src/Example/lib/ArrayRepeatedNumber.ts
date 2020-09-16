import { Sort } from "../../SortingArithmetic/Sort/lib/Sort.ts";
import { HashMap } from "../../DictionaryTest/lib/HashMap.ts";

/**
 * 寻找数组中的重复数字
 *
 * 规则：
 *  1. 给定一个长度为n的数组，所有数字都在0~n-1的范围内
 *  2. 数组中某些数字是重复的，但是不知道有哪些数字重复了，也不知道每个数字重复了几次
 *  3. 求数组中任意一个重复的数字
 */
export class ArrayRepeatedNumber {
    private sort: Sort<number>;
    private readonly isTrue: boolean;
    constructor(private array: number[]) {
        this.isTrue = true;
        // 判断参数是否满足规则
        if (array == null || array.length <= 0) {
            this.isTrue = false;
            console.log("数组不能为空");
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i] < 0 || array[i] > array.length - 1) {
                this.isTrue = false;
                console.log("数组中元素的取值范围为0～n-1");
            }
        }
        this.sort = new Sort(array);
    }

    /**
     * 使用排序的方法解决
     *
     * 实现思路:
     *  1. 对数组进行排序
     *  2. 从头到尾遍历排序好的数组，只要有相邻的两个数字相等就返回
     */
    getRepeatedToSort(): number | void {
        if (this.isTrue) {
            // 排序数组
            const sortArray = this.sort.quickSort();
            // 重复的数字
            let val = -1;
            for (let i = 0; i < sortArray.length; i++) {
                // 排序完成后，相邻的两个数字相等就代表数组中有重复数字，将其返回
                if (sortArray[i] == sortArray[i + 1]) {
                    val = sortArray[i];
                    break;
                }
            }
            return val;
        }
    }

    /**
     * 使用哈希表解决
     *
     * 实现思路:
     *  1. 声明一个空的哈希表
     *  2. 从头到尾遍历数组，如果当前遍历到的元素不存在与哈希表中，就把它加入哈希表，否则就返回这个元素
     */
    getRepeatedToHashMap(): number | void {
        if (this.isTrue) {
            const hashMap = new HashMap();
            let val = -1;
            for (let i = 0; i < this.array.length; i++) {
                // 如果哈希表中存在当前元素就将其返回
                if (hashMap.get(this.array[i]) != null) {
                    val = this.array[i];
                    break;
                }
                // 不存在，将其加入哈希表
                hashMap.put(this.array[i], 0);
            }
            return val;
        }
    }

    /**
     * 动态排序法（最优解法）
     *
     * 根据题意可知，数组中元素的取值范围在0~n-1，那么就可以得到如下结论：
     *  1. 如果数组中没有重复元素，那么第i号元素的值一定是当前下标(i)
     *  2. 如果数组中有重复元素，那么有些位置可能存在多个数字，有些位置可能没有数字
     *
     * 根据上述结论，我们可以得出下述实现思路:
     *  1. 从头到尾遍历排序好的数组，存储第i号位置的元素，用m表示
     *  2. 如果m的值等于当前下标(i)，则继续遍历。
     *     否则就判断m的值是否等于数组下标为m处的值。
     *       如果等于代表重复将其返回。
     *       如果不等于，就交换数组i号位置的元素和m号位置的元素，更新m的值。
     *       继续判断m的值是否等于数组下标为m处的元素
     *
     * 举例说明:
     * [8, 1, 2, 3, 4, 3, 3, 4, 5]
     * 当下标为0时，m = 8。
     *  8 != 0
     *   数组8号位置的元素为5，8 != 5。
     *   则交换位置，更新m的值。交换位置后的数组为：[5, 1, 2, 3, 4, 3, 3, 4, 8]
     *  5 != 0
     *   数组5号位置的元素为3，3 != 5。
     *   则交换位置，更新m的值。交换位置后的数组为：[3, 1, 2, 3, 4, 5, 3, 4, 8]
     *  3 == 3
     *   元素重复，返回m
     * 问题解决，重复数字为3。
     *
     * 时间复杂度分析：每个数字最多只要交换2次就能找到它的位置，因此总的时间复杂度为O(n)
     * 空间复杂度分析：所有操作都在原数组进行，没有用到额外的空间，所以空间复杂度为O(1)
     */
    getRepeated(): number | void {
        if (this.isTrue) {
            for (let i = 0; i < this.array.length; i++) {
                // 存储数组i号位置的元素
                let m = this.array[i];
                // 判断m的值是否与当前下标一样，一样则继续下一轮循环
                while (m !== i) {
                    // 判断m的值是否等于数组m号位置的元素
                    if (m === this.array[m]) {
                        // 如果相等，代表重复，返回这个元素
                        return m;
                    }
                    // 交换数组的i号位置的元素和m号位置的元素
                    [this.array[i], this.array[m]] = [this.array[m], this.array[i]];
                    // 交换完毕，更新m的值
                    m = this.array[i];
                }
            }
            // 未找到
            return -1;
        }
    }
}
