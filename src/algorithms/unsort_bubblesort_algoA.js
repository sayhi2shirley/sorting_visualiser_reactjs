import {swap} from './helpers';

/* 'BubbleSort AlgorithmA' Component to hold the random array values. */
const bubbleSortAlgorithmA = (arr, ind, position, arrSteps, arrColors) => {
    let clrCode = arrColors[arrColors.length - 1].slice();
    
    bubbleSortAlgoA(arr, ind, arrSteps, arrColors, clrCode, 1);
    bubbleSortAlgoA(ind, arr, arrSteps, arrColors, clrCode, 0);
};

// Creating the bubbleSort function
const bubbleSortAlgoA = (arr, ind, stps, colors, clrCode, sorting) => {
    for (var i = 0; i < arr.length; i++) {
        // Last element is set in place after each i iteration
        for (var j = 0; j < ( arr.length - i -1 ); j++) {
            /* Before-swap-Bar-Color-Coding Start */
            clrCode[j] = 1; 
            clrCode[j + 1] = 1;
            colors.push(clrCode.slice());
            /* Before-swap-Bar-Color-Coding End */

        	// Check if the successive element is smaller
        	if (arr[j] > arr[j + 1]) {
                swap(arr, j, j+1);
	            swap(ind, j, j+1);
	        }

            /* After-swap-Bar-Color-Coding Start */
            sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
            clrCode[j] = 0; 
            clrCode[j + 1] = 0;
            /* After-swap-Bar-Color-Coding End */
        }
        clrCode[arr.length - i - 1] = 2;
        sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
        colors.push(clrCode.slice());
    }
    colors[colors.length - 1] = new Array(arr.length).fill(2);
    return;
}

export default bubbleSortAlgorithmA;