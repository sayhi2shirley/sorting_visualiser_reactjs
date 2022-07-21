// Bubble sort Implementation using Javascript

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Creating the bblSort function
function algoB_BubbleSort(arr, myMap)
{
    var k = 0;	
    for (var i = 0; i < arr.length; i++) {
	
        // Last i elements are already in place
        for (var j = 0; j < ( arr.length - i -1 ); j++) {
	
        	// Checking if the item at present iteration
        	// is greater than the next iteration
        	if (arr[j] > arr[j+1]) {
        	    myMap.set(k, []);
        	    myMap.get(k).push(j);
        	    myMap.get(k).push(j+1);
             	// If the condition is true then swap them
              swap(arr, j, j+1);
              console.log(myMap.get(k));
              k++;
	        }
        }
    }

}

function alogBUnSort(arr, myMap)
{
  const reversedArr = Array.from(myMap).reverse();

  reversedArr.forEach(([key, value]) => {
    swap(arr, myMap.get(key)[0], myMap.get(key)[1]);
  });
  //console.log("Hello");
  console.log(reversedArr);
  //console.log("end");
}


// This is our unsorted array
var arr = [5, 1, 4, 2, 8, 0, 0];
var swapdInd = new Map();
// Now pass this array to the bblSort() function
algoB_BubbleSort(arr, swapdInd);
// Print the sorted array
console.log("Sorted array arr ");
console.log(arr);
//Unsort the sorted array
console.log("\nUnsorting: ");
alogBUnSort(arr, swapdInd);
// Print the unsorted array
console.log("UnSorted sorted array arr ");
console.log(arr);
