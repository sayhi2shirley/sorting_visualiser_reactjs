export function algoABubbleFunction() {
    return 'Sort arr[] & ind[] using Bubble\n' + '-'.repeat(31) +
           '\n\nFOR i = 0 to arr.length \n' + ' '.repeat(4) +
           'FOR j = 0 to arr.length - i -1\n'+
           ' '.repeat(8) + 'IF arr[j] > arr[j + 1] THEN\n' +
           ' '.repeat(12) + 'swap(arr, j, j+1)\n' +
           ' '.repeat(12) + 'swap(ind, j, j+1)\n\n\n' + 
           'Unsort the sorted arr[] & ind[] using Bubble\n'+
           '-'.repeat(44) +
           '\n\nFOR i = 0 to ind.length\n' + ' '.repeat(4) +
           'FOR j = 0 to ind.length - i -1\n'+
           ' '.repeat(8) + 'IF ind[j] > ind[j + 1] THEN\n' +
           ' '.repeat(12) + 'swap(ind, j, j+1)\n' +
           ' '.repeat(12) + 'swap(arr, j, j+1)\n';
   }
     
   export function  algoAInsertionFunction()  {
    return  'Sort arr[] & ind[] using Insertion Sort\n' + '-'.repeat(39) +
            '\n\nFOR i = 1 to arr.length\n' + ' '.repeat(4) +
            'key = arr[i]\n' + ' '.repeat(4) +
            'temp = ind[i]\n' + ' '.repeat(4) +
            'j = i - 1\n' + ' '.repeat(4) +
            'WHILE j >= 0 && arr[j] > key \n'  + ' '.repeat(8) +
            'arr[j + 1] = arr[j]\n'  + ' '.repeat(8) +
            'ind[j + 1] = ind[j]\n'  + ' '.repeat(8) +
            'j = j - 1\n' + ' '.repeat(4) +
            'arr[j + 1] = key\n' + ' '.repeat(4) +
            'ind[j + 1] = temp\n\n' + 
            'UnSort arr[] & ind[] using Insertion Sort\n' + '-'.repeat(41) +
            '\n\nFOR i = 0 to ind.length\n' + ' '.repeat(4) +
            'key = ind[i]\n' + ' '.repeat(4) +
            'temp = arr[i]\n' + ' '.repeat(4) +
            'j = i - 1\n' + ' '.repeat(4) +
            'WHILE j >= 0 && ind[j] > key \n'  + ' '.repeat(8) +
            'ind[j + 1] = ind[j]\n'  + ' '.repeat(8) +
            'arr[j + 1] = arr[j]\n'  + ' '.repeat(8) +
            'j = j - 1\n' + ' '.repeat(4) +
            'ind[j + 1] = key\n' + ' '.repeat(4) +
            'arr[j + 1] = temp\n\n'
            ;
  }
  
  export function algoBBubbleFunction() {
    return 'Sort arr[] using Bubble and keep track of ' + 
           'the swapped Indices\n' + '-'.repeat(61) + '\n\nk = 0\n' +
           'For i = 0 to  arr.length\n' + ' '.repeat(4) +
           'FOR j = 0 to arr.length - i -1\n' + ' '.repeat(8) +
           'IF arr[j] > arr[j+1]\n'  + ' '.repeat(12) +
           'myMap.set(k, [])\n' + ' '.repeat(12) +
           'myMap.get(k).push(j)\n' + ' '.repeat(12) +
           'myMap.get(k).push(j+1)\n' + ' '.repeat(12) +
           'swap(arr, j, j+1)\n' + ' '.repeat(12) + 'k++\n\n' + 
           'Unsort arr[] using the swapped Indices\n' + '-'.repeat(38) + 
           '\n\nreversedArr = Array.from(myMap).reverse()\n' + 
           'reversedArr.forEach(([key, value])\n' + ' '.repeat(4) +
           'swap(arr, myMap.get(key)[0], myMap.get(key)[1])';
  }
  
  export function  algoBInsertionFunction () {
    return 'Sort arr[] using Insertion Sort and keep track of ' + 
    'the swapped Indices\n' + '-'.repeat(69) + '\n\nk = 0\n' +
    'FOR i = 1 to arr.length\n' + ' '.repeat(4) +
    'myMap.set(k, [])\n' + ' '.repeat(4) +
    'key = arr[i]\n' + ' '.repeat(4) +
    'myMap.get(k).push(i)\n' + ' '.repeat(4) +
    'temp = i\n' + ' '.repeat(4) +
    'j = i - 1\n' + ' '.repeat(4) +
    'WHILE j >= 0 && arr[j] > key \n'  + ' '.repeat(8) +
    'myMap.get(k).push(j)\n' + ' '.repeat(8) + 'k++\n' + ' '.repeat(8) +
    'arr[j + 1] = arr[j]\n'  + ' '.repeat(8) + 'temp = j\n' + ' '.repeat(8) +
    'j = j - 1\n' + ' '.repeat(8) +
    'myMap.set(k, [])\n' + ' '.repeat(8) + 
    'myMap.get(k).push(temp)\n' + ' '.repeat(8) +
    'arr[j + 1] = key\n' + ' '.repeat(4) +
    'myMap.get(k).push(temp)\n\n' + 
    'Unsort arr[] using the swapped Indices\n' + '-'.repeat(38) + 
    '\n\nreversedArr = Array.from(myMap).reverse()\n' + 
    'reversedArr.forEach(([key, value])\n' + ' '.repeat(4) +
    'swap(arr, myMap.get(key)[0], myMap.get(key)[1])';
  }
