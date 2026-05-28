function sumUnique(arr) {
    const freq = new Map();
    for (const num of arr) freq.set(num, (freq.get(num) || 0) + 1);
    let sum = 0;
    for (const [num, count] of freq) if (count === 1) sum += num;
    return sum;
}

const numbers = [1, 1];
console.log(sumUnique(numbers)); // 7 (3 + 4, так как 1 и 2 повторяются)
