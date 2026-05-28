function sumOfSquares(arr) {
    return arr.reduce((sum, n) => sum + n * n, 0);
}

const arr = [1, 2, 3];
console.log(sumOfSquares(arr)); // 14 (т.к. 1² + 2² + 3² = 1+4+9 = 14)
