

/**
 * The swap function swaps the two array elements
 * based on the indices passed.
 * @param {array} arr - A variable contains array of integers
 * @param {number} i - A variable contains an index
 * @param {number} j - A variable contains an index
 * @return void
 */
 export function swap (arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}