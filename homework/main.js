/**
 * Преобразует многомерный массив в одномерный (рекурсивное flatten).
 * @param {Array} arr - массив с произвольной глубиной вложенности
 * @returns {Array} - плоский массив
 * @example flatten([1, [2, [3, 4], 5], 6]) -> [1,2,3,4,5,6]
 */
function flatten(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // Рекурсивный вызов для вложенного массива
            result.push(...flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}


console.log(flatten([1, [2, [3, [4]]]])); // [1,2,3,4]
console.log(flatten([]));                 // []
