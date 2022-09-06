import {swap} from './helpers';

/* 'BubbleSort AlgorithmA' Component to reverse sort the random array value. */
const bubbleSortAlgorithmA = (arr, swpIn, totSteps, sortSteps, arrColors) => {
  let clrCode = arrColors[arrColors.length - 1].slice();
  algoA_BubbleSort(arr, swpIn, totSteps, sortSteps, arrColors, clrCode);
  alogAUnSort(arr, swpIn, totSteps, arrColors, clrCode);
};


// Creating the bblSort function
function algoA_BubbleSort(arr, myMap, stps, sortStep, colors, clrCode)
{
    var k = 0;	
    for (var i = 0; i < arr.length; i++) {
	
        // Last i elements are already in place
        for (var j = 0; j < ( arr.length - i -1 ); j++) {
            // Before-swap-Bar-Color-Coding Start
            clrCode[j] = 1; 
            clrCode[j + 1] = 1;
            colors.push(clrCode.slice());
            // Before-swap-Bar-Color-Coding End

        	/* Checking if the item at present iteration
        	 is greater than the next iteration */
        	if (arr[j] > arr[j+1]) {
        	    myMap.set(k, []);
        	    myMap.get(k).push(j);
        	    myMap.get(k).push(j+1);
             	// If the condition is true then swap them
              swap(arr, j, j+1);
              // To display swapped-indices - Debugging
              console.log(myMap.get(k)); 
              k++;
	        }
          // After-swap-Bar-Color-Coding Start
          stps.push(arr.slice());
          sortStep.push(arr.slice());
          clrCode[j] = 0; 
          clrCode[j + 1] = 0;
          // After-swap-Bar-Color-Coding End
        }
        clrCode[arr.length - i - 1] = 2;
        stps.push(arr.slice());
        sortStep.push(arr.slice());
        colors.push(clrCode.slice());
    }
    colors[colors.length - 1] = new Array(arr.length).fill(2);
    return;
}

function alogAUnSort(arr, myMap, stps, colors, clrCode)
{
  const reversedArr = Array.from(myMap).reverse();

  reversedArr.forEach(([key, value]) => {

    // Before-swap-Bar-Color-Coding Start
    clrCode[myMap.get(key)[0]] = 1; 
    clrCode[myMap.get(key)[1]] = 1;
    colors.push(clrCode.slice());
    stps.push(arr.slice());
    // Before-swap-Bar-Color-Coding End

    swap(arr, myMap.get(key)[0], myMap.get(key)[1]);

    // After-swap-Bar-Color-Coding Start
    clrCode[myMap.get(key)[0]] = 0; 
    clrCode[myMap.get(key)[1]] = 0;
    colors.push(clrCode.slice());
    stps.push(arr.slice());
    // After-swap-Bar-Color-Coding End
  });
  colors[colors.length - 1] = new Array(arr.length).fill(2);
  return;
}

export default bubbleSortAlgorithmA;