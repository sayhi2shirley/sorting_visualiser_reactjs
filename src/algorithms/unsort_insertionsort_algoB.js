
const insertionSortAlgorithmB = (arr, ind, position, arrSteps, lastSortStep, arrColors) => {
    let clrCode = arrColors[arrColors.length - 1].slice();
    
    insertionSortAlgoB(arr, ind, arrSteps, lastSortStep, arrColors, clrCode, 1);
    console.log('Sort algo B insert ' + arrSteps.length + ' ' + lastSortStep.length);
    insertionSortAlgoB(ind, arr, arrSteps, lastSortStep, arrColors, clrCode, 0);
    console.log('Unsort algo B insert ' +arrSteps.length + ' ' + lastSortStep.length);
};

// Creating the insertionSort function
const insertionSortAlgoB = (arr, ind, stps, lastSortStep, colors, clrCode, sorting) => { 
    let i, key, temp, j; 
    let n = arr.length;
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; 
        temp = ind[i];
        j = i - 1; 

        /* Before-comparison-Bar-Color-Coding Start */
        clrCode[i] = 3; 
        clrCode[j] = 1;
        sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
        if (sorting === 1) lastSortStep.push(arr.slice());
        colors.push(clrCode.slice());
        /* Before-comparison-Bar-Color-Coding End */

        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j] > key)
        { 
            /* Before-swap-Bar-Color-Coding Start */
            if (i === j+1) {
                clrCode[j+1] = 3; 
            } 
            clrCode[j] = 1;
            sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
            if (sorting === 1) lastSortStep.push(arr.slice());
            colors.push(clrCode.slice());
            /* Before-swap-Bar-Color-Coding End */

            arr[j + 1] = arr[j]; 
            ind[j + 1] = ind[j];

            /* After-swap-Bar-Color-Coding Start */
            clrCode[i] = 0;
            clrCode[j+1] = 0;
            clrCode[j] = 0;
            if (sorting === 1) { 
                //console.log('Sorting first push ' + stps.length); 
            } else {
                console.log('Unsorting first push ' + stps.length); 
            }
            sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
            if (sorting === 1) lastSortStep.push(arr.slice());
            if (sorting === 1) { 

            } else {console.log('Unsorting after first push ' + stps.length); }
            colors.push(clrCode.slice());
            /* After-swap-Bar-Color-Coding End */

            /* Go to previous element */
            j = j - 1; 
        } 
        arr[j + 1] = key; 
        ind[j + 1] = temp;
        clrCode[i] = 0;
        clrCode[j] = 0;
        if (sorting === 1) { 

        } else { console.log('Unsorting 2 first push ' + stps.length); }
        sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
        if (sorting === 1) lastSortStep.push(arr.slice());
        if (sorting === 1) { 
            
        } else {console.log('Unsorting 2 after first push ' + stps.length); }
        colors.push(clrCode.slice());
    } 
    console.log(stps.length);
    colors[colors.length - 1] = new Array(arr.length).fill(2);
    return;
};

export default insertionSortAlgorithmB;