// Bubble sort Implementation using Javascript

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Creating the bblSort function
function bblSort(arr, ind){
	
    for(var i = 0; i < arr.length; i++){
	
        // Last i elements are already in place
        for(var j = 0; j < ( arr.length - i -1 ); j++){
	
        	// Checking if the item at present iteration
        	// is greater than the next iteration
        	if(arr[j] > arr[j+1]){
             	// If the condition is true then swap them
              	swap(arr, j, j+1);
	            swap(ind, j, j+1);
	        }
        }
    }
    // Print the sorted array
    console.log("Sorted array arr ");
    console.log(arr);
    console.log("Sorted array ind ");
    console.log(ind);
}

function partition(arr, arr2, low, high) {
 
    // pivot
    let pivot = arr[high];
 
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = (low - 1);
 
    for (let j = low; j <= high - 1; j++) {
 
        // If current element is smaller
        // than the pivot
        if (arr[j] < pivot) {
 
            // Increment index of
            // smaller element
            i++;
            swap(arr, i, j);
            swap(arr2, i, j);
        }
    }
    swap(arr, i + 1, high);
    swap(arr2, i + 1, high);
    return (i + 1);
}

function quickSort(arr, arr2, low, high) {
    if (low < high) {
 
        // pi is partitioning index, arr[p]
        // is now at right place
        let pi = partition(arr, arr2, low, high);
 
        // Separately sort elements before
        // partition and after partition
        quickSort(arr, arr2, low, pi - 1);
        quickSort(arr, arr2, pi + 1, high);
    }
}

// This is our unsorted array
var arr = [5, 1, 4, 2, 8];
var ind = [];
for(var i = 0; i < arr.length; i++) {
    ind[i] = i
}
// Now pass this array to the bblSort() function
bblSort(arr, ind);

//Unsort the sorted array
console.log("Unsorting: ");
quickSort(ind, arr, 0, arr.length -1);
// Print the unsorted array
console.log("UnSorted sorted array arr ");
console.log(arr);
console.log("UnSorted sorted array ind ");
console.log(ind);