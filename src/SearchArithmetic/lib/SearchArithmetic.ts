import { Sort } from "../../SortingArithmetic/Sort/lib/Sort.ts";
import { Compare, defaultCompare, defaultEquals, ICompareFunction, IDiffFunction, defaultDiff, biggerEquals, lesserEquals } from "../../../utils/Util.ts";

export class SearchArithmetic<T> {
    private sort: Sort<T>;
    constructor(private array: T[], private target: T, private compareFn: ICompareFunction<T> = defaultCompare) {
        this.sort = new Sort<T>(array);
    }

    // 线性查找
    linearSearch(): number | null {
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] === this.target) {
                return i;
            }
        }
        return null;
    }

    // 二分查找
    binarySearch(): number | null {
        // 对数组进行排序
        this.sort.quickSort();
        // 设置指针作为数组边界
        let low = 0;
        let high = this.array.length - 1;
        while (low <= high) {
            // 获取数组中间值
            const mid = Math.floor((low + high) / 2);
            // 获取数组的中间值
            const element = this.array[mid];
            // 如果数组中间值小于目标值，low+1,向其右边继续找
            if (this.compareFn(element, this.target) === Compare.LESS_THAN) {
                low = mid + 1;
            } else if (this.compareFn(element, this.target) === Compare.BIGGER_THAN) {
                // 如果中间值大于目标值,向其左边继续找
                high = mid - 1;
            } else {
                // 中间值等于目标值，元素找到，返回mid即当前元素在数组的位置
                return mid;
            }
        }
        // 未找到，返回null
        return null;
    }

    /**
     * 内插搜索
     *  二分查找的优化，通过特定算法计算delta和position的值优化掉二分查找的寻找中间值做法
     * @param equalsFn 校验两个值是否相等函数
     * @param diffFn 计算两个数的差值函数
     */
    interpolationSearch(equalsFn = defaultEquals, diffFn: IDiffFunction<T> = defaultDiff): number | null {
        // 排序
        this.sort.quickSort();
        // 获取数组程度
        const { length } = this.array;
        // 定义指针，确定数组边界
        let low = 0;
        let high = length - 1;
        // 声明position，用于公式
        let position = -1;
        let delta = -1;
        // 目标值大于等于数组的low边界值且目标值小于等于high边界值就执行循环里的内容
        while (low <= high && biggerEquals(this.target, this.array[low], this.compareFn) && lesserEquals(this.target, this.array[high], this.compareFn)) {
            // 目标值与array的low边界的值做差
            // 与array的high边界的值和low边界的值做差
            // 最后将二者得出的值做除法运算，计算出delta值
            delta = diffFn(this.target, this.array[low]) / diffFn(this.array[high], this.array[low]);
            // 计算比较值的位置
            position = low + Math.floor((high - low) * delta);
            // 如果比较值位置的元素等于目标值，则返回当前索引
            if (equalsFn(this.array[position], this.target)) {
                return position;
            }
            // 如果比较值位置的元素小于目标值，则向其右边继续找
            if (this.compareFn(this.array[position], this.target) === Compare.LESS_THAN) {
                low = position + 1;
            } else {
                // 如果比较值位置的元素大于目标值，则向其左边继续查找
                high = position - 1;
            }
        }
        // 未找到
        return null;
    }
}
