import {swap} from './helpers';
//import {highlightPseudocode} from '../components/utility.js'

/* 'BubbleSort AlgorithmA' Component to hold the random array values. */
const bubbleSortAlgorithmA = (arr, ind, position, arrSteps, lastSortStep, arrColors) => {
    console.log(arrColors.length);
    
    let clrCode = arrColors[arrColors.length - 1].slice();
    
    bubbleSortAlgoA(arr, ind, arrSteps, lastSortStep, arrColors, clrCode, 1);
    console.log('Sort ' + arrSteps.length);
    //lastSortStep = arrSteps.map((arr) => arr.slice());
    console.log('Sort ' + arrSteps.length + 'last step' + lastSortStep.length);
    bubbleSortAlgoA(ind, arr, arrSteps, lastSortStep, arrColors, clrCode, 0);
    console.log('UnSort ' + arrSteps.length + 'last step' + lastSortStep.length);
};

// Creating the bubbleSort function
const bubbleSortAlgoA = (arr, ind, stps, lastSortStep, colors, clrCode, sorting) => {
    for (var i = 0; i < arr.length; i++) {
        //highlightPseudocode('for (i = 0; i < arr.length; i++) {');
        
        // Last element is set in place after each i iteration
        for (var j = 0; j < ( arr.length - i -1 ); j++) {
            //highlightPseudocode('for (j = 0; j < (arr.length - i -1); j++) {');
            /* Before-swap-Bar-Color-Coding Start */
            clrCode[j] = 1; 
            clrCode[j + 1] = 1;
            colors.push(clrCode.slice());
            //console.log(colors.length);
            /* Before-swap-Bar-Color-Coding End */

        	// Check if the successive element is smaller
        	if (arr[j] > arr[j + 1]) {
                swap(arr, j, j+1);
	            swap(ind, j, j+1);
	        }
            //if (sorting === 0) {console.log(stps.length);}
            /* After-swap-Bar-Color-Coding Start */
            sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
            if (sorting === 1) lastSortStep.push(arr.slice());
            clrCode[j] = 0; 
            clrCode[j + 1] = 0;
            /* After-swap-Bar-Color-Coding End */
        }
        clrCode[arr.length - i - 1] = 2;
        sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
        if (sorting === 1) lastSortStep.push(arr.slice());
        colors.push(clrCode.slice());
    }
    //console.log(stps.length);
    colors[colors.length - 1] = new Array(arr.length).fill(2);
    return;
}

export default bubbleSortAlgorithmA;