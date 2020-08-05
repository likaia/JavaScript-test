import { Sort } from "../../SortingArithmetic/Sort/lib/Sort.ts";

export class SearchArithmetic<T> {
    private sort: Sort<T>;
    constructor(private array: T[], private target: T) {
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
    binarySearch(): void {
        // 对数组进行排序
        this.sort.quickSort();
    }
}
