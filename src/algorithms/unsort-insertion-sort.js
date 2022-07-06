function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function insertionSort(arr, ind, n) 
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
            ind[j+1] = ind[j];
            j = j - 1; 
        } 
        arr[j + 1] = key; 
        ind[j+1] = temp;
    } 
    console.log("Insertion Sort");
    console.log("Sorted Array arr");
    console.log(arr);
    console.log("Sorted Array ind");
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
    ind[i] = i;
}
// Now pass this array to the bblSort() function
insertionSort(arr, ind, arr.length);

//Unsort the sorted array
console.log("Unsorting: ");
quickSort(ind, arr, 0, arr.length -1);
// Print the unsorted array
console.log("UnSorted sorted array arr ");
console.log(arr);
console.log("UnSorted sorted array ind ");
console.log(ind);