import {swap} from './helpers';

/* 'BubbleSort AlgorithmA' Component to hold the random array values. */
const bubbleSortAlgorithmA = (arr, swpIn, position, arrSteps, lastSortStep, arrColors) => {
  let clrCode = arrColors[arrColors.length - 1].slice();
  
  algoA_BubbleSort(arr, swpIn, arrSteps, lastSortStep, arrColors, clrCode);
  console.log('Sort algo A Bubble ' + arrSteps.length + ' ' + lastSortStep.length);
  alogAUnSort(arr, swpIn, arrSteps, arrColors, clrCode);
  console.log('Unsort algo A Bubble ' + arrSteps.length + ' ' + lastSortStep.length);
};


// Creating the bblSort function
function algoA_BubbleSort(arr, myMap, stps, lastSortStep, colors, clrCode)
{
    var k = 0;	
    for (var i = 0; i < arr.length; i++) {
	
        // Last i elements are already in place
        for (var j = 0; j < ( arr.length - i -1 ); j++) {
          /* Before-swap-Bar-Color-Coding Start */
          clrCode[j] = 1; 
          clrCode[j + 1] = 1;
          colors.push(clrCode.slice());
          /* Before-swap-Bar-Color-Coding End */
        	// Checking if the item at present iteration
        	// is greater than the next iteration
        	if (arr[j] > arr[j+1]) {
        	    myMap.set(k, []);
        	    myMap.get(k).push(j);
        	    myMap.get(k).push(j+1);
             	// If the condition is true then swap them
              swap(arr, j, j+1);
              //console.log(myMap.get(k)); // To display swapped-indices
              k++;
	        }
           /* After-swap-Bar-Color-Coding Start */
          stps.push(arr.slice());
          lastSortStep.push(arr.slice());
          clrCode[j] = 0; 
          clrCode[j + 1] = 0;
           /* After-swap-Bar-Color-Coding End */
        }
        clrCode[arr.length - i - 1] = 2;
        stps.push(arr.slice());
        lastSortStep.push(arr.slice());
        colors.push(clrCode.slice());
    }
    colors[colors.length - 1] = new Array(arr.length).fill(2);
    return;
}

function alogAUnSort(arr, myMap, stps, colors, clrCode)
{
  const reversedArr = Array.from(myMap).reverse();
  //console.log("algo A bubble unsort " + stps.length);

  reversedArr.forEach(([key, value]) => {

    /* Before-swap-Bar-Color-Coding Start */
    clrCode[myMap.get(key)[0]] = 1; 
    clrCode[myMap.get(key)[1]] = 1;
    colors.push(clrCode.slice());
    stps.push(arr.slice());
    //console.log("algo A bubble unsort before swap " + stps.length);
    /* Before-swap-Bar-Color-Coding End */

    swap(arr, myMap.get(key)[0], myMap.get(key)[1]);

    /* After-swap-Bar-Color-Coding Start */
    clrCode[myMap.get(key)[0]] = 0; 
    clrCode[myMap.get(key)[1]] = 0;
    colors.push(clrCode.slice());
    stps.push(arr.slice());
    //console.log("algo A bubble unsort after swap " + stps.length);
    /* After-swap-Bar-Color-Coding End */
  });
  colors[colors.length - 1] = new Array(arr.length).fill(2);
  //console.log(reversedArr);
  return;
}

export default bubbleSortAlgorithmA;