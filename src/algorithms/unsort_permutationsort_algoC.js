
/* 'PermutationSort AlgorithmC' Component to hold the random array values. */
const permutationSortAlgorithmC = (arr, num) => {
  var resArr = [];
  var originalArr = [];
  algoC_PermutationSort(arr, resArr, num, 1);
  algoC_PermutationSort(resArr, originalArr, num,  0);
};

function algoC_PermutationSort(arr, resultArr, permNum, sorting) {

  let result = [];
  let m = [];
  permute(arr, result, m);

  // Two one dimensional arrays a & b is sorted.
  // eslint-disable-next-line
  let sortedPerm = result.slice().sort(function (a, b) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        continue;
      }
      return a[i] - b[i];
    }
  });

  var hash = {};
  for (var i = 0; i < sortedPerm.length; i += 1) {
    hash[sortedPerm[i]] = i;
  }

  var ind = 0, j = 0;
  if (sorting) {
    if (hash.hasOwnProperty(arr) && permNum[0] === 0) {
      permNum[0] = hash[arr];
      ind = 0;
    }
  } else {
    ind = permNum[0];
  }
  for (var vals of sortedPerm[ind]) {
    resultArr[j++] = vals;
  }
  return;
}

function permute(arr, result, m) {

  if (arr.length === 0) {
    result.push(m);
    return;
  } else {
    for (let i = 0; i < arr.length; i++) {
      let curr = arr.slice();
      /* splice removes an element from
       ith position from curr. The removed element 
       will be concatenated into m. */
      let next = curr.splice(i, 1);
      permute(curr.slice(), result, m.concat(next));
    }
  }
  return;
}


export default permutationSortAlgorithmC;