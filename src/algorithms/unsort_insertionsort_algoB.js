import {swap} from './helpers';

const insertionSortAlgorithmB = (arr, swpIn, position, arrSteps, arrColors) => {
  let clrCode = arrColors[arrColors.length - 1].slice();
  
  insertionSort(arr, swpIn, arrSteps, arrColors, clrCode);
  alogBUnSort(arr, swpIn, arrSteps, arrColors, clrCode);
};

function insertionSort(arr, myMap, stps, colors, clrCode) 
{ 
  let i, key, temp, j;
  let k = 0;
  for (i = 1; i < arr.length; i++)
  { 
      myMap.set(k, []);
      key = arr[i]; 
      myMap.get(k).push(i);
      temp = i;
      j = i - 1; 

      /* Before-comparison-Bar-Color-Coding Start */
      clrCode[i] = 3; 
      clrCode[j] = 1;
      stps.push(arr.slice());
      colors.push(clrCode.slice());
      /* Before-comparison-Bar-Color-Coding End */

      /* Move elements of arr[0..i-1], that are 
      greater than key, to one position ahead 
      of their current position */
      while (j >= 0 && arr[j] > key) { 
          myMap.get(k).push(j);
          k++;

          /* Before-swap-Bar-Color-Coding Start */
          if (i === j+1) {
              clrCode[j+1] = 3; 
          } 
          clrCode[j] = 1;
          stps.push(arr.slice());
          colors.push(clrCode.slice());
          /* Before-swap-Bar-Color-Coding End */  

          arr[j + 1] = arr[j];

          /* After-swap-Bar-Color-Coding Start */
          clrCode[i] = 0;
          clrCode[j+1] = 0;
          clrCode[j] = 0;
          stps.push(arr.slice());
          colors.push(clrCode.slice());
          /* After-swap-Bar-Color-Coding End */

          temp = j;
          /* Go to previous element */
          j = j - 1; 
          myMap.set(k, []);
          myMap.get(k).push(temp);
      }
      arr[j + 1] = key; 
      myMap.get(k).push(temp);
  }
  colors[colors.length - 1] = new Array(arr.length).fill(2);
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
   return;
}

export default insertionSortAlgorithmB;