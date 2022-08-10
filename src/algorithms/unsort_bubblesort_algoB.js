import {swap} from './helpers';

/* 'BubbleSort AlgorithmB' Component to hold the random array values. */
const bubbleSortAlgorithmB = (arr, swpIn, position, arrSteps, arrColors) => {
  let clrCode = arrColors[arrColors.length - 1].slice();
  
  algoB_BubbleSort(arr, swpIn, arrSteps, arrColors, clrCode);
  alogBUnSort(arr, swpIn, arrSteps, arrColors, clrCode);
};


// Creating the bblSort function
function algoB_BubbleSort(arr, myMap, stps, colors, clrCode)
{
    var k = 0;	
    for (var i = 0; i < arr.length; i++) {
	
        // Last i elements are already in place
        for (var j = 0; j < ( arr.length - i -1 ); j++) {
          clrCode[j] = 1; 
          clrCode[j + 1] = 1;
          colors.push(clrCode.slice());
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
          stps.push(arr.slice());
          clrCode[j] = 0; 
          clrCode[j + 1] = 0;
        }
        clrCode[arr.length - i - 1] = 2;
        stps.push(arr.slice());
        colors.push(clrCode.slice());
    }
    colors[colors.length - 1] = new Array(arr.length).fill(2);
    return;
}

function alogBUnSort(arr, myMap, stps, colors, clrCode)
{
  const reversedArr = Array.from(myMap).reverse();

  reversedArr.forEach(([key, value]) => {

    /* Before-swap-Bar-Color-Coding Start */
    clrCode[myMap.get(key)[0]] = 1; 
    clrCode[myMap.get(key)[1]] = 1;
    colors.push(clrCode.slice());
    stps.push(arr.slice());
    /* Before-swap-Bar-Color-Coding End */

    swap(arr, myMap.get(key)[0], myMap.get(key)[1]);

    /* After-swap-Bar-Color-Coding Start */
    clrCode[myMap.get(key)[0]] = 0; 
    clrCode[myMap.get(key)[1]] = 0;
    colors.push(clrCode.slice());
    stps.push(arr.slice());
    /* After-swap-Bar-Color-Coding End */
  });
  colors[colors.length - 1] = new Array(arr.length).fill(2);
  console.log(reversedArr);
  return;
}

export default bubbleSortAlgorithmB;