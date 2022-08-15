import React, { Component } from 'react';
import './reversible-sorting-visualiser.css';
import Bar from '../components/bar.js';
import bubbleSortAlgorithmA from '../algorithms/unsort_bubblesort_algoA.js';
import insertionSortAlgorithmA from '../algorithms/unsort-insertion-sort_algoA';
import bubbleSortAlgorithmB from '../algorithms/unsort_bubblesort_algoB';
import insertionSortAlgorithmB from '../algorithms/unsort_insertionsort_algoB';
import Sort from '@material-ui/icons/SortSharp';
import Reset from '@material-ui/icons/RotateLeft';
import Stop from '@material-ui/icons/StopSharp'
import Pause from '@material-ui/icons/PauseSharp'
import Forward from '@material-ui/icons/SkipNextSharp';
import Backward from '@material-ui/icons/SkipPreviousSharp';
import Unsort from '@material-ui/icons/BarChartSharp';
import {pseudocode} from '../components/utility';

//Class based component - ReversibleSortingVisualiser
class ReversibleSortingVisualiser extends Component {
 constructor(props) {
    super(props);

    this.state = {
        inputArray: [],
        barCount: 10,   /* Number of Bars */
        indices: [],    /* Algorithm A */
        swpIndices: [], /* Algorithm B */
        animationOn: 0,
        colorCode: [],
        barColors: [],
        timeout: [],
        delay: 200,
        sortingSteps: [], /* Number of steps required to sort */
        algoSteps: [],  /* Number of steps required to sort and unsort */
        currentStep: 0,
        algorithm: 'Algorithm-A Bubble Sort',
        algoPseudocode: [],
        algo: [
          { //key: 0, value: 
            _id: 1, 
            name: 'Algorithm-A Bubble Sort',
            funcName: bubbleSortAlgorithmA,
            text: 'Algorithm-A Sort - Bubble Sort, Unsort - Indices Array'   
          },
          { //key: 1, value: 
            _id: 2, 
            name: 'Algorithm-A Insertion Sort',
            funcName: insertionSortAlgorithmA,
            text: 'Algorithm-A Sort - Insertion Sort, Unsort - Indices Array' 
          },
          { //key: 2, value: 
            _id: 3, 
            name: 'Algorithm-B Bubble Sort',
            funcName: bubbleSortAlgorithmB,
            text: 'Algorithm-B Sort - Bubble Sort, Unsort - Tracking Swapped positions' 
          },          
          { //key: 3, value: 
            _id: 4, 
            name: 'Algorithm-B Insertion Sort',
            funcName: insertionSortAlgorithmB,
            text: 'Algorithm-B Sort - Insertion Sort, Unsort - Tracking Swapped positions'
          }
        ],
    };
 }

 // Renders the updated data afte r all the page is rendered
 componentDidMount() {
    this.generateArrayElements();
 }

 // Generate Random number in the range
 generateRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 };

 // Generate random array elements 
 generateArrayElements = () => {

    let count = this.state.barCount;
    let bar = [];
    let idx = [];

    this.clearTimeout();
    this.clearColorCode();
    document.getElementById("rstbtn").disabled = false;
    document.getElementById("plybtn").disabled = false;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("bckbtn").disabled = true;
    document.getElementById("frwdbtn").disabled = false;

    for (let i = 0; i < count; i++) {
       bar.push(this.generateRandomNum(0, 20));
       idx.push(i);
       var swapdInd = new Map();    
    }

    // Save the array after the generation
    this.setState({
        inputArray: bar,
        algoSteps: [bar],
        barCount: count,
        indices: idx,
        swpIndices: swapdInd,
        sortingSteps: [bar],
        /* After generation, step would be 0 */ 
        currentStep: 0, 
       }, () => this.generateAlgoSteps());

       console.log(bar);
 };

 /* Captures the array elements changes */
 changeArrayElements = (idx, val) => {
   let chgdArray = this.state.inputArray;
   chgdArray[idx] = val;

   // Save the array after the updation
   this.setState({
      inputArray: chgdArray,
      algoSteps: [chgdArray],
      sortingSteps: [chgdArray],
      currentStep: 0, 
     });
 };

 getKeyByAlgoName = (map, searchValue) => {
   for (let [key, value] of map.entries()) {
     if (value.name === searchValue) {
         //console.log(key, value.name);
         return key;
     }
   }
 };
 
  generateAlgoSteps = () => {
      let array = this.state.inputArray.slice();
      let steps = this.state.algoSteps.slice();
      let colors = this.state.barColors.slice();
      let sortNum = this.state.sortingSteps.slice();
      
      let key = this.getKeyByAlgoName(this.state.algo, this.state.algorithm);

      /* Display by default the chosen algorithm */
      document.getElementById('selectedAlgorithm').innerHTML = ''; // To clear the previous text
      document.getElementById('selectedAlgorithm').innerHTML = 
                                    this.state.algo[key].text; 
      /* Display the pseudocode */
      document.getElementById('dislayPseudocode').innerHTML = ''; // To clear the previous text
      document.getElementById('dislayPseudocode').innerHTML = 
                          '<pre>' + pseudocode[key]() + '</pre>'; 
                          console.log('sorting steps' + sortNum.length + ' steps ' + steps.length);
      /* Number of Steps and Colors will be calculated */
      if (this.state.algo[key].name === 'Algorithm-A Bubble Sort' ||
          this.state.algo[key].name  === 'Algorithm-A Insertion Sort') {
          //console.log(key, this.state.algo[key].funcName);
          let idx = this.state.indices.slice();
          this.state.algo[key].funcName(array, idx, 0, steps, sortNum, colors);
          console.log('sorting steps' + sortNum.length + ' steps ' + steps.length);

      } else {
          //console.log(key, this.state.algo[key].funcName);
          let swpIn = this.state.swpIndices;
          this.state.algo[key].funcName(array, swpIn, 0, steps, sortNum, colors);
      }
      console.log('sorting steps' + sortNum.length);
      this.setState({
         algoSteps: steps,
         barColors: colors, 
         sortingSteps: sortNum,
        });
                          
  };

  clearTimeout = () => {
      this.state.timeout.forEach(timeoutVal => this.clearTimeout(timeoutVal));
      this.setState({timeout: []});
  };

  // clearColorKey
  clearColorCode = () => {
      let numOfBars = new Array(this.state.barCount).fill(0);
      this.setState({colorCode: numOfBars, barColors: [numOfBars]});
  };

  playAnimation = () => {
      let stp = this.state.currentStep;
      let noOfSteps = this.state.algoSteps;
      let color = this.state.barColors;
      let sortStp = this.state.sortingSteps;

      this.setState({
         inputArray: noOfSteps[stp],
         colorCode: color[stp],
         currentStep: stp + 1,
        });

      if (this.state.animationOn === 1) {
          return;
      }

      /* setup another timeout for next step unless
       * it finished executing or paused
       */
      console.log('Play' + this.state.currentStep + '  ' + noOfSteps.length + ' sort step ' + sortStp.length);
      if (this.state.currentStep < (sortStp.length -1)) {
      //if (this.state.currentStep < (noOfSteps.length -1)) {
         setTimeout(this.playAnimation, this.state.delay);
      } 
      // Finished executing
      if (this.state.currentStep === (noOfSteps.length - 1)) {
          document.getElementById("plybtn").disabled = true;
          document.getElementById("pasbtn").disabled = true;
          document.getElementById("rstbtn").disabled = false;
          document.getElementById("stpbtn").disabled = true;
          document.getElementById("bckbtn").disabled = true;
          document.getElementById("frwdbtn").disabled = true;
      }
  };

  unsortAnimation = () => {
    let stp = this.state.currentStep;
    let noOfSteps = this.state.algoSteps;
    let color = this.state.barColors;
    let sortStp = this.state.sortingSteps;

    this.setState({
       inputArray: noOfSteps[stp],
       colorCode: color[stp],
       currentStep: stp + 1,
      });

    if (this.state.animationOn === 1) {
        return;
    }

    /* setup another timeout for next step unless
     * it finished executing or paused
     */
    console.log('Unsort' + this.state.currentStep + '  ' + noOfSteps.length + ' sort step ' + sortStp.length);
    
    if (this.state.currentStep < (noOfSteps.length -1)) {
       setTimeout(this.unsortAnimation, this.state.delay);
    } 
    // Finished executing
    if (this.state.currentStep === (noOfSteps.length - 1)) {
        document.getElementById("plybtn").disabled = true;
        document.getElementById("pasbtn").disabled = true;
        document.getElementById("rstbtn").disabled = false;
        document.getElementById("stpbtn").disabled = true;
        document.getElementById("bckbtn").disabled = true;
        document.getElementById("frwdbtn").disabled = true;
    }
};

  /* Set colorCode, currentStep, timeout, and delay */
  handlePlay = () => {
      let flag = this.state.animationOn;
      flag = 0;
      let noOfSteps = this.state.algoSteps;
      let sortStp = this.state.sortingSteps;

      /* Fix for play again after finish */
      //if (this.state.currentStep >= (noOfSteps.length - 1)) {
      console.log('Play' + this.state.currentStep + '  ' + noOfSteps.length + ' sort step ' + sortStp.length);

      if (this.state.currentStep >= (sortStp.length - 1)) {
          document.getElementById("plybtn").disabled = true;
          return;
      } 

      this.clearTimeout();
      document.getElementById("plybtn").disabled = true;
      document.getElementById("pasbtn").disabled = false;
      document.getElementById("rstbtn").disabled = true;
      document.getElementById("stpbtn").disabled = false;
      document.getElementById("bckbtn").disabled = true;
      document.getElementById("frwdbtn").disabled = true;

      /*
       * Set the animationOn back to 0 
       * to avoid pause immediately.
       */
      this.setState({
        animationOn: flag,
      });
   
      setTimeout(this.playAnimation, this.state.delay); 
  };

  /* Set colorCode, currentStep, timeout, and delay */
  handleUnsorting = () => {
       let flag = this.state.animationOn;
       flag = 0;
      let noOfSteps = this.state.algoSteps;
      let sortStp = this.state.sortingSteps;
      let curStep = this.state.currentStep;

      if (curStep < this.state.sortingSteps) {
          return;
      }

      console.log('Unsorting ' + this.state.currentStep + '  ' + noOfSteps.length + ' sort step ' + sortStp.length);

      if (this.state.currentStep >= (noOfSteps.length.length - 1)) {
          document.getElementById("unsrtbtn").disabled = true;
          return;
      } 

      this.clearTimeout();
      document.getElementById("plybtn").disabled = true;
      document.getElementById("pasbtn").disabled = false;
      document.getElementById("rstbtn").disabled = true;
      document.getElementById("stpbtn").disabled = false;
      document.getElementById("bckbtn").disabled = true;
      document.getElementById("frwdbtn").disabled = true;

      /*
       * Set the animationOn back to 0 
       * to avoid pause immediately.
       */
      this.setState({
        animationOn: flag,
      });
   
      setTimeout(this.unsortAnimation, this.state.delay); 
  };

  handlePause = () => {
      let currentStp = this.state.currentStep;
      let flag = this.state.animationOn;
      flag = 1;

      this.setState({
        currentStep: currentStp,
        inputArray: this.state.algoSteps[currentStp],
        colorCode: this.state.barColors[currentStp],
        animationOn: flag,
      });

      document.getElementById("rstbtn").disabled = true;
      document.getElementById("plybtn").disabled = false;
      document.getElementById("pasbtn").disabled = true;
      document.getElementById("stpbtn").disabled = false;
      document.getElementById("bckbtn").disabled = false;
      document.getElementById("frwdbtn").disabled = false;
  };

  handleStop = () => {
      let currentStp = this.state.currentStep;
      let flag = this.state.animationOn;
      flag = 1;

      this.setState({
        currentStep: currentStp,
        inputArray: this.state.algoSteps[currentStp],
        colorCode: this.state.barColors[currentStp],
        animationOn: flag,
      });

      document.getElementById("rstbtn").disabled = false;
      document.getElementById("plybtn").disabled = true;
      document.getElementById("pasbtn").disabled = true;
      document.getElementById("stpbtn").disabled = true;
      document.getElementById("bckbtn").disabled = true;
      document.getElementById("frwdbtn").disabled = true;
  };

  handleBackward = () => {
    let currentStp = this.state.currentStep;

    if (currentStp === 0) return;

    document.getElementById("rstbtn").disabled = false;
    document.getElementById("plybtn").disabled = false;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("frwdbtn").disabled = false;

    if (currentStp === 1) {
        document.getElementById("plybtn").disabled = false;
        document.getElementById("bckbtn").disabled = true;
    }

    currentStp -= 1;

    this.setState({
     currentStep: currentStp,
     inputArray: this.state.algoSteps[currentStp],
     colorCode: this.state.barColors[currentStp],
    });
 };

  handleForward = () => {
    let currentStp = this.state.currentStep;
    
    document.getElementById("rstbtn").disabled = false;
    document.getElementById("plybtn").disabled = false;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("bckbtn").disabled = false;

    console.log('Forward' + currentStp + ' ' + this.state.algoSteps.length); 
    //if (currentStp === this.state.algoSteps.length) {
    if (this.state.currentStep >= (this.state.algoSteps.length - 1)) {
        document.getElementById("frwdbtn").disabled = true;
        return;
    }
    
    currentStp += 1;

    this.setState({
     currentStep: currentStp,
     inputArray: this.state.algoSteps[currentStp],
     colorCode: this.state.barColors[currentStp],
    });
 };

 /* Calculate the number of steps for the chosen
  * Algorithm with the same Bar heights.
  */

 selectAlgorithm = algos => () => {
    //console.log(algos);
    this.setState({
      algorithm: algos.name,
    });

    /* Number of Steps need to be recalculated
     * after changing the algorithm
     */
    this.clearTimeout();

    document.getElementById('selectedAlgorithm').innerHTML = ''; // To clear the previous text
    document.getElementById('selectedAlgorithm').innerHTML = 
                                  algos.text; 

    document.getElementById("rstbtn").disabled = false;
    document.getElementById("plybtn").disabled = false;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("bckbtn").disabled = true;
    document.getElementById("frwdbtn").disabled = false;

    document.getElementById('dislayPseudocode').innerHTML = '';
    document.getElementById('dislayPseudocode').innerHTML = 
    '<pre>' + pseudocode[algos._id - 1]() + '</pre>'; 

    this.clearColorCode();
        // Save the array after the generation
        this.setState({
          algoSteps: [this.state.inputArray],
          /* After generation, step would be 0 */ 
          currentStep: 0, 
         }, () => this.generateAlgoSteps());
     console.log(this.state.inputArray);
     
 }

  render() { 

    const barHeight = this.state.inputArray?.map((val, idx) => 
         <Bar key={idx} arrIdx={idx} height={val} 
              clrCode={this.state.colorCode[idx]} 
              chgdArr={this.changeArrayElements} /> 
    );

    const algoButtons = this.state.algo?.map(algos => 
         <button className='algoBtns' key={algos._id} 
                 onClick={this.selectAlgorithm(algos)} 
                 value={algos.name}>{algos.name}</button>
    );
 
    return( 
        <div className='ReversibleSortingVisualiser'>
            <div className='algorithm-selection-box'>
               {algoButtons}
            </div>  
              <p id="selectedAlgorithm"></p>
            <div className='array-bar'>
               <div className='arrayOutline container'>
                  {barHeight}
               </div>

               <div className="code-display">
                 <p id="dislayPseudocode"></p>
               </div>
            </div>

            <div className='buttonOutline'>
                <button id="rstbtn" onClick={this.generateArrayElements}>
                  <Reset/></button>
                <button id="bckbtn" onClick={this.handleBackward}>
                  <Backward/></button>
                <button id="frwdbtn" onClick={this.handleForward}>
                  <Forward/></button>
                <button id="plybtn" onClick={this.handlePlay}>
                  <Sort/></button>
                <button id="unsrtbtn" onClick={this.handleUnsorting}>
                  <Unsort/></button>
                <button id="pasbtn" onClick={this.handlePause}>
                  <Pause/></button>
                <button id="stpbtn" onClick={this.handleStop}>
                  <Stop/></button>
            </div> 
        </div>     
    );    
  }
}
export default ReversibleSortingVisualiser;
    