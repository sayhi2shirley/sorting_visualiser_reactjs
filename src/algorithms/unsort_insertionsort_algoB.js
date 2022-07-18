function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function insertionSort(arr, myMap) 
{ 
  let i, key, temp, j;
  let k = 0;
  for (i = 1; i < arr.length; i++)
  { 
      myMap.set(k, []);
      key = arr[i]; 
      myMap.get(k).push(i);
      temp = i;
      //console.log(temp);
      j = i - 1; 
 
      /* Move elements of arr[0..i-1], that are 
      greater than key, to one position ahead 
      of their current position */
      while (j >= 0 && arr[j] > key) { 
          myMap.get(k).push(j);
          //console.log(myMap.get(k));
          k++;
          
          arr[j + 1] = arr[j];
          temp = j;
          j = j - 1; 
          myMap.set(k, []);
          myMap.get(k).push(temp);
          //console.log(myMap.get(k));
      }
      arr[j + 1] = key; 
      myMap.get(k).push(temp);
      //console.log(myMap.get(k));
  }
}


function alogBUnSort(arr, myMap)
{
const reversedArr = Array.from(myMap).reverse();

reversedArr.forEach(([key, value]) => {
  swap(arr, myMap.get(key)[0], myMap.get(key)[1]);
});
//console.log(reversedArr);
}


// This is our unsorted array
var arr = [5, 1, 4, 2, 8];
var swapdInd = new Map();

// Now pass this array to the bblSort() function
insertionSort(arr, swapdInd);
// Print the sorted array
console.log("Insertion Sort\nSorted array arr ");
console.log(arr);
//Unsort the sorted array
console.log("\nUnsorting: ");
alogBUnSort(arr, swapdInd);
// Print the unsorted array
console.log("UnSorted sorted array arr ");
console.log(arr);
