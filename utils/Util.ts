// 常用函数工具类
// 校验函数
export function defaultEquals(a: any,b: any) {
    return a === b;
}

// 任意类型转字符串函数
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