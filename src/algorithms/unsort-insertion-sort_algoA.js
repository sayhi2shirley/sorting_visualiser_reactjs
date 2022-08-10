
const insertionSortAlgorithmA = (arr, ind, position, arrSteps, arrColors) => {
    let clrCode = arrColors[arrColors.length - 1].slice();
    
    insertionSortAlgoA(arr, ind, arrSteps, arrColors, clrCode, 1);
    insertionSortAlgoA(ind, arr, arrSteps, arrColors, clrCode, 0);
};

// Creating the insertionSort function
const insertionSortAlgoA = (arr, ind, stps, colors, clrCode, sorting) => { 
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
            colors.push(clrCode.slice());
            /* Before-swap-Bar-Color-Coding End */

            arr[j + 1] = arr[j]; 
            ind[j + 1] = ind[j];

            /* After-swap-Bar-Color-Coding Start */
            clrCode[i] = 0;
            clrCode[j+1] = 0;
            clrCode[j] = 0;
            sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
            colors.push(clrCode.slice());
            /* After-swap-Bar-Color-Coding End */

            /* Go to previous element */
            j = j - 1; 
        } 
        arr[j + 1] = key; 
        ind[j + 1] = temp;
        clrCode[i] = 0;
        clrCode[j] = 0;
        sorting ? stps.push(arr.slice()) : stps.push(ind.slice());
        colors.push(clrCode.slice());
    } 
    colors[colors.length - 1] = new Array(arr.length).fill(2);
    return;
};

export default insertionSortAlgorithmA;