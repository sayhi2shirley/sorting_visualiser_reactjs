/* 'BubbleSort AlgorithmA' Component to hold the random array values. */
const bubbleSortAlgorithmA = (arr, ind, position, arrSteps, arrColors) => {
    let clrCode = arrColors[arrColors.length - 1].slice();
    
    bubbleSortAlgoA(arr, ind, arrSteps, arrColors, clrCode, 1);
    bubbleSortAlgoA(ind, arr, arrSteps, arrColors, clrCode, 0);
};

/**
 * The swap function swaps the two array elements
 * based on the indices passed.
 * @param {array} arr - A variable contains array of integers
 * @param {number} i - A variable contains an index
 * @param {number} j - A variable contains an index
 * @return void
 */
const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

// Creating the bubbleSort function
const bubbleSortAlgoA = (arr, ind, stps, colors, clrCode, sorting) => {
    for (var i = 0; i < arr.length; i++) {
        // Last element is set in place after each i iteration
        for (var j = 0; j < ( arr.length - i -1 ); j++) {
        	// Check if the successive element is smaller
        	if (arr[j] > arr[j + 1]) {
                swap(arr, j, j+1);
	            swap(ind, j, j+1);
	        }
            sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
            clrCode[j] = 1; 
            clrCode[j + 1] = 1;
            colors.push(clrCode.slice());
            clrCode[j] = 0; 
            clrCode[j + 1] = 0;
        }
        clrCode[arr.length - i - 1] = 2;
        sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
        colors.push(clrCode.slice());
    }
    colors[colors.length - 1] = new Array(arr.length).fill(2);
    return;
}

export default bubbleSortAlgorithmA;