// 常用函数工具类

export type ICompareFunction<T> = (a: T, b: T) => number;

export enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0
}

export function defaultEquals(a: any,b: any) {
    return a === b;
}

export function defaultToString(item: any) {
    if (item === null){
        return "null";
    } else if(item === undefined){
        return "undefined";
    } else if(typeof item === "string" ||item instanceof String){
        return `${item}`;
    }
    return item.toString();
}

export function defaultCompare<T>(a:T, b:T) {
    if (a === b){
        return Compare.EQUALS;
    }else if(a > b) {
        return Compare.BIGGER_THAN;
    }else {
        return Compare.LESS_THAN;
    }
}

