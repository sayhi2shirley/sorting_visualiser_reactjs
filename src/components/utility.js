import {algoABubbleFunction, algoAInsertionFunction,
    algoBBubbleFunction, algoBInsertionFunction,
    algoCPermutationFunction} from './pseudocode.js';

export var pseudocode = [
    algoABubbleFunction,
    algoAInsertionFunction,
    algoBBubbleFunction,
    algoBInsertionFunction,
    algoCPermutationFunction
  ]

export function highlightPseudocode(text) {
     //console.log(text);
     var currentPseudo = document.getElementById("dislayPseudocode");
     var currentLine = currentPseudo.innerHTML;
     var index = currentLine.indexOf(text);
     if (index >= 0) { 
        currentLine = currentLine.substring(0,index) + 
            "<span className='highlight'>" + 
            currentPseudo.substring(index,index+text.length) + "</span>" + 
            currentPseudo.substring(index + text.length);
        currentPseudo.innerHTML = currentLine;
     }
}
