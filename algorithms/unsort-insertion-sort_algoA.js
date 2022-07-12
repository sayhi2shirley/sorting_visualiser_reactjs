/**
 * The swap function swaps the two array elements
 * based on the indices passed.
 * @param {array} arr - A variable contains array of integers
 * @param {number} i - A variable contains an index
 * @param {number} j - A variable contains an index
 * @return void
 */
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Function to implement insertion sort
function insertionSortAlgorithmA(arr, ind, n) 
{ 
    let i, key, temp, j; 
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; 
        temp = ind[i];
        j = i - 1; 
   
        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j] > key)
        { 
            arr[j + 1] = arr[j]; 
            ind[j + 1] = ind[j];
            j = j - 1; 
        } 
        arr[j + 1] = key; 
        ind[j + 1] = temp;
    } 
}

// This is our unsorted array
var arr = [5, 1, 4, 2, 8];
var ind = [];
for(var i = 0; i < arr.length; i++) {
    ind[i] = i;
}
// Now pass this array to the bblSort() function
console.log("Insertion Sort");
insertionSortAlgorithmA(arr, ind, arr.length);
console.log("Sorted Array arr[]");
console.log(arr);
console.log("Sorted Array ind[]");
console.log(ind);

//Unsort the sorted array
console.log("Unsort using Insertion Sort: ");
insertionSortAlgorithmA(ind, arr, ind.length);
// Print the unsorted array
console.log("UnSorted the sorted array arr[] ");
console.log(arr);
console.log("UnSorted the sorted array ind[] ");
console.log(ind);