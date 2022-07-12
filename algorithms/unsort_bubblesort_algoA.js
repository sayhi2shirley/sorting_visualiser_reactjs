// Bubble sort Implementation

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

// Creating the bubbleSort function
function bubbleSortAlgorithmA(arr, ind) {
    for(var i = 0; i < arr.length; i++) {
        // Last element is set in place after each i iteration
        for(var j = 0; j < ( arr.length - i -1 ); j++) {
        	// Check if the successive element is smaller
        	if(arr[j] > arr[j + 1]) {
              	swap(arr, j, j+1);
	            swap(ind, j, j+1);
	        }
        }
    }
}

// This is our unsorted array
var arr = [5, 1, 4, 2, 23, 12];
var ind = [];
for(var i = 0; i < arr.length; i++) {
    ind[i] = i
}
// Now pass this array to the bubbleSortAlgorithmA() function
console.log("Bubble Sort ");
bubbleSortAlgorithmA(arr, ind);
// Print the sorted array
console.log("Sorted array arr[] ");
console.log(arr);
console.log("Sorted array ind[] ");
console.log(ind);

//Unsort the sorted array
console.log("Unsort using Bubble Sort: ");
bubbleSortAlgorithmA(ind, arr);
// Print the unsorted array
console.log("UnSorted the sorted array arr[] ");
console.log(arr);
console.log("UnSorted the sorted array ind[] ");
console.log(ind);