/**
 * 判断json数组中是否包含某个json对象
 * @param jsonArray 需要判断的json数组
 * @param jsonObj 需要判断的json对象
 * @returns {boolean}
 */
const arrayHasObj = (jsonArray, jsonObj) => {
    const objKeys = Object.keys(jsonObj);
    if (!(jsonArray instanceof Array) && !(jsonObj instanceof Object)) {
        return false;
    }
    for (let i = 0; i < jsonArray.length; i++) {
        const itemObj = jsonArray[i];
        const itemObjKeys = Object.keys(itemObj);
        // key数量不等，跳出本次循环
        if (objKeys.length !== itemObjKeys.length) {
            break;
        }
        // 判断两个对象的key值是否都相等
        let keysStatus = false;
        for (let j = 0; j < objKeys.length; j++) {
            keysStatus = itemObjKeys.includes(objKeys[j]);
        }
        // key值相等
        if (keysStatus) {
            // 开始对比value
            let valeStatus = false;
            for (let j = 0; j < objKeys.length; j++) {
                valeStatus = itemObj[itemObjKeys[j]] === jsonObj[objKeys[j]];
                if (!valeStatus) {
                    return false;
                }
            }
            if (valeStatus) {
                return true;
            }
        }
    }
    return false;
};

const jsonArray = [{ name: "测试11", age: "20" }];
const jsonObj = { name: "测试11", age: "20" };
const result = arrayHasObj(jsonArray, jsonObj);
console.log(result);
