export function algoABubbleFunction() {
    return 'Sort arr[] & ind[] using Bubble\n' + '-'.repeat(31) +
           '\nfor (i = 0; i < arr.length; i++) {\n' + ' '.repeat(4) +
           'for (j = 0; j < (arr.length - i -1); j++) {\n'+
           ' '.repeat(8) + 'if (arr[j] > arr[j + 1]) {\n' +
           ' '.repeat(12) + 'swap(arr, j, j+1);\n' +
           ' '.repeat(12) + 'swap(ind, j, j+1);\n' +
           ' '.repeat(8) + '}\n' + ' '.repeat(4) + '}\n}\n\n' + 
           'Unsort the sorted arr[] & ind[] using Bubble\n'+
           '-'.repeat(44) +
           '\nfor (i = 0; i < ind.length; i++) {\n' + ' '.repeat(4) +
           'for (j = 0; j < (ind.length - i -1); j++) {\n'+
           ' '.repeat(8) + 'if (ind[j] > ind[j + 1]) {\n' +
           ' '.repeat(12) + 'swap(ind, j, j+1);\n' +
           ' '.repeat(12) + 'swap(arr, j, j+1);\n' +
           ' '.repeat(8) + '}\n' + ' '.repeat(4) + '}\n}\n';
   }
     
   export function  algoAInsertionFunction()  {
    return  'Sort arr[] & ind[] using Insertion Sort\n' + '-'.repeat(36) +
            '\nfor (i = 0; i < arr.length; i++) {\n' + ' '.repeat(4) +
            'key = arr[i];\n' + ' '.repeat(4) +
            'temp = ind[i];\n' + ' '.repeat(4) +
            'j = i - 1;\n' + ' '.repeat(4) +
            'while (j >= 0 && arr[j] > key) {\n'  + ' '.repeat(8) +
            'arr[j + 1] = arr[j];\n'  + ' '.repeat(8) +
            'ind[j + 1] = ind[j];\n'  + ' '.repeat(8) +
            'j = j - 1;\n' + ' '.repeat(4) + '}\n' + ' '.repeat(4) +
            'arr[j + 1] = key;\n' + ' '.repeat(4) +
            'ind[j + 1] = temp;\n}';
  }
  
  export function algoBBubbleFunction() {
    return "3333 Take your finger out of your ear and listen to me";
  }
  
  export function  algoBInsertionFunction () {
    return "4444 Take your finger out of your ear and listen to me";
  }
