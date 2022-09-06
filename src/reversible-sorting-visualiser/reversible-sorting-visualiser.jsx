import React, { Component } from 'react';
import './reversible-sorting-visualiser.css';
import Bar from '../components/bar.js';
import bubbleSortAlgorithmA from '../algorithms/unsort_bubblesort_algoA.js';
import insertionSortAlgorithmA from '../algorithms/unsort_insertionsort_algoA';
import bubbleSortAlgorithmB from '../algorithms/unsort_bubblesort_algoB';
import insertionSortAlgorithmB from '../algorithms/unsort_insertionsort_algoB';
//import permutationSortAlgorithmC from '../algorithms/unsort_permutationsort_algoC'
import Sort from '@material-ui/icons/SortSharp';
import Reset from '@material-ui/icons/RotateLeft';
import Stop from '@material-ui/icons/StopSharp'
import Pause from '@material-ui/icons/PauseSharp'
import Forward from '@material-ui/icons/SkipNextSharp';
import Backward from '@material-ui/icons/SkipPreviousSharp';
import Unsort from '@material-ui/icons/BarChartSharp';
import { pseudocode } from '../components/utility';

//Class based component - ReversibleSortingVisualiser
class ReversibleSortingVisualiser extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      inputArray: [],
      origArray: [],
      barCount: 0,    /* Array Size */
      indices: [],    /* Algorithm A */
      swpIndices: {}, /* Algorithm B */
      permuteNum: 0,  /* Algorithm C */
      animationOn: 0,
      colorCode: [],
      barColors: [],
      delay: 300,
      sortingSteps: [], /* Number of steps required to sort */
      algoSteps: [],  /* Number of steps required to sort and unsort */
      currentStep: 0,
      algorithm: 'Algorithm-B Bubble Sort',
      algoPseudocode: [],
      algo: [
        { //key: 0, value: 
          _id: 1,
          name: 'Algorithm-A Bubble Sort',
          funcName: bubbleSortAlgorithmA,
          text: 'Algorithm-A Sort-Bubble Sort, Unsort-Tracking Swapped positions',
          tc: 'Sort - O(n^2), Unsorting - O(n), T(n) = O(n^2)',
          sc: 'Sort - O(n^2), Unsorting - O(n), O(n^2)'
        },
        { //key: 1, value: 
          _id: 2,
          name: 'Algorithm-A Insertion Sort',
          funcName: insertionSortAlgorithmA,
          text: 'Algorithm-A Sort-Insertion Sort, Unsort-Tracking Swapped positions',
          tc: 'Sort - O(n^2), Unsorting - O(n), T(n) = O(n^2)',
          sc: 'Sort - O(n^2), Unsorting - O(n), O(n^2)'
        },
        { //key: 2, value: 
          _id: 3,
          name: 'Algorithm-B Bubble Sort',
          funcName: bubbleSortAlgorithmB,
          text: 'Algorithm-B Sort-Bubble Sort, Unsort-Indices Array',
          tc: 'Sort - O(n^2), Unsorting - O(n^2), T(n) = O(n^2)',
          sc: 'Sort - O(n), Unsorting - O(n), O(n)'
        },
        { //key: 3, value: 
          _id: 4,
          name: 'Algorithm-B Insertion Sort',
          funcName: insertionSortAlgorithmB,
          text: 'Algorithm-B Sort-Insertion Sort, Unsort-Indices Array',
          tc: 'Sort - O(n^2), Unsorting - O(n^2), T(n) = O(n^2)',
          sc: 'Sort - O(n), Unsorting - O(n), O(n)'
       /* },
        { //key: 4, value: 
          _id: 5,
          name: 'Algorithm-C Permutation Sort',
          funcName: permutationSortAlgorithmC,
          text: 'Algorithm-C Sort-Permutation, Unsort-Permutation',
          tc: 'Sort - O(n!), Unsorting - O(n!), T(n) = O(n!)',
          sc: 'Sort - O(n!), Unsorting - O(n!)' */
        }
      ],
    };
  }

  // Renders the updated data after the page is rendered
  componentDidMount() {
    
    // To avoid componentDidMount calling twice
    if (this.first) return; 
    this.first = true;

    let arrSz = document.getElementById("arrsize");

    this.setState({
      barCount: arrSz.value,
    }, () => this.generateArrayElements());

  }

  // Generate random number in the range between 0(min) and 20(max)
  generateRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generate random array elements 
  generateArrayElements = () => {
    let bar = [];
    let idx = [];

    let count = this.state.barCount;

    /* Fills the colorCode & barColors with default values */
    this.clearColorCode();

    document.getElementById("arrsize").disabled = false;
    document.getElementById("speed").disabled = false;
    document.getElementById("rstbtn").disabled = false;
    document.getElementById("plybtn").disabled = false;
    document.getElementById("unsrtbtn").disabled = true;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("bckbtn").disabled = true;
    document.getElementById("frwdbtn").disabled = false;

    for (let i = 0; i < count; i++) {
      bar.push(this.generateRandomNum(0, 20));
      idx.push(i);
      var swapdInd = new Map();
      var permutes = new Map();
    }

    // Save the array after the generation
    this.setState({
      inputArray: bar,
      origArray: bar,
      algoSteps: [bar],
      barCount: count,
      indices: idx,
      swpIndices: swapdInd,
      permuteList: permutes,
      sortingSteps: [bar],
      /* After generation, step would be 0 */
      currentStep: 0,
    }, () => this.generateAlgoSteps());
  };

  updateArraySize = () => {
    let arrSz = document.getElementById("arrsize");

    this.setState({
      barCount: arrSz.value,
    }, () => this.generateArrayElements());

    /* Update the Array's size in the output */
    document.getElementById('outputSize').value = arrSz.value;
  };

  updateAnimationSpeed = () => {
    let animSpeed = document.getElementById("speed");

    this.setState({
      delay: animSpeed.value,
    });

    /* Update the Animation speed in the output */
    document.getElementById('outputSpeed').value = animSpeed.value;
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
    }, () => this.generateAlgoSteps());
  };

  getKeyByAlgoName = (map, searchValue) => {
    for (let [key, value] of map.entries()) {
      if (value.name === searchValue) {
        return key;
      }
    }
  };

  generateAlgoSteps = () => {
    let array = this.state.inputArray.slice();
    let totalSteps = this.state.algoSteps.slice();
    let colors = this.state.barColors.slice();
    let sortSteps = this.state.sortingSteps.slice();
    let key = this.getKeyByAlgoName(this.state.algo, this.state.algorithm);
    var perm = new Array(1).fill(0);

    /* Display by default the chosen algorithm */
    document.getElementById('selectedAlgorithm').innerHTML = ''; // To clear the previous text
    document.getElementById('selectedAlgorithm').innerHTML =
      this.state.algo[key].text;

    /* Display the pseudocode */
    document.getElementById('dislayPseudocode').innerHTML = ''; // To clear the previous text
    document.getElementById('dislayPseudocode').innerHTML =
    '<pre>' + pseudocode[key]() + '</pre>';

    /* Number of Steps and colors[][] will be created */
    if (this.state.algo[key].name === 'Algorithm-A Bubble Sort' ||
      this.state.algo[key].name === 'Algorithm-A Insertion Sort') {

      let swpIn = this.state.swpIndices;
      this.state.algo[key].funcName(array, swpIn, totalSteps, sortSteps, colors);

    } else if (this.state.algo[key].name === 'Algorithm-B Bubble Sort' ||
      this.state.algo[key].name === 'Algorithm-B Insertion Sort') {

      let idx = this.state.indices;
      this.state.algo[key].funcName(array, idx, totalSteps, sortSteps, colors);
      
    } else {
      this.state.algo[key].funcName(array, perm);
    }

    this.setState({
      algoSteps: totalSteps,
      barColors: colors,
      sortingSteps: sortSteps,
      permuteNum: perm,
    });

    /* Display the Number of Operations */
    document.getElementById('numberofOperations').innerHTML = ''; // To clear the previous text
    document.getElementById('numberofOperations').innerHTML =
    // eslint-disable-next-line 
      '<pre>' + '\nInput Array:        ' + array +
      '\nTotal No of Operations/Steps:  ' + totalSteps.length +
      '\nSorting Steps:                 ' + sortSteps.length +
      '\nUnsorting Steps:               ' + (totalSteps.length - sortSteps.length) +
      '\nTime Complexity:               ' + this.state.algo[key].tc +
      '\nSpace Complexity:              ' + this.state.algo[key].sc + '</pre>';

  };

  // Clear the color code of the bar
  clearColorCode = () => {
    let size = this.state.barCount;
    /* Fills the initial color(Pink) before 
       execution by setting the value as 0 */
    const numOfBars = new Array(size).fill(0);

    // Deep copy is performed
    while ((size - 1) > 0) {
      numOfBars.push(0);
      size--;
    }
    this.setState({ colorCode: numOfBars, barColors: [numOfBars] });
  };

  /* Timer function to execute the next step
    of sorting after the delay */
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
    if (this.state.currentStep < (sortStp.length - 1)) {
      setTimeout(this.playAnimation, this.state.delay);
    }
    // Finished executing the sorting, update buttons
    if (this.state.currentStep === (sortStp.length - 1)) {
      document.getElementById("arrsize").disabled = false;
      document.getElementById("speed").disabled = false;
      document.getElementById("rstbtn").disabled = false;
      document.getElementById("bckbtn").disabled = false;
      document.getElementById("frwdbtn").disabled = false;
      document.getElementById("plybtn").disabled = true;
      document.getElementById("unsrtbtn").disabled = false;
      document.getElementById("pasbtn").disabled = true;
      document.getElementById("stpbtn").disabled = true;
    }
  };

  /* Timer function to execute the next step
    of unsorting after the delay */
  unsortAnimation = () => {
    let stp = this.state.currentStep;
    let noOfSteps = this.state.algoSteps;
    let color = this.state.barColors;

    this.setState({
      inputArray: noOfSteps[stp],
      colorCode: color[stp],
      currentStep: stp + 1,
    });
    if (this.state.animationOn === 1) {
      return;
    }

    /* setup another timeout for next step unless
     * unsorting is finished executing or paused
     */
    if (this.state.currentStep < (noOfSteps.length - 1)) {
      setTimeout(this.unsortAnimation, this.state.delay);
    }
    // Finished executing the unsorting, update buttons
    if (this.state.currentStep === (noOfSteps.length - 1)) {
      document.getElementById("arrsize").disabled = false;
      document.getElementById("speed").disabled = false;
      document.getElementById("rstbtn").disabled = false;
      document.getElementById("bckbtn").disabled = false;
      document.getElementById("frwdbtn").disabled = true;
      document.getElementById("plybtn").disabled = true;
      document.getElementById("unsrtbtn").disabled = true;
      document.getElementById("pasbtn").disabled = true;
      document.getElementById("stpbtn").disabled = true;
    }
  };

  /* Set colorCode, currentStep, inputArray, and animationOn flag */
  handleSort = () => {
    let flag = this.state.animationOn;
    flag = 0;

    /* Button shouldn't be enabled if the steps are 
     more than sortingSteps.length */
    let sortStp = this.state.sortingSteps;
    if (this.state.currentStep >= (sortStp.length - 1)) {
      document.getElementById("plybtn").disabled = true;
      return;
    }

    document.getElementById("arrsize").disabled = true;
    document.getElementById("speed").disabled = true;
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

  /* Set colorCode, currentStep, inputArray, and animationOn flag */
  handleUnsorting = () => {
    let flag = this.state.animationOn;
    flag = 0;

    let curStep = this.state.currentStep;
    if (curStep < this.state.sortingSteps) {
      return;
    }

    /* Button shouldn't be enabled if the 
     steps are less than sortingSteps.length or
     more than algoSteps */
    let noOfSteps = this.state.algoSteps;
    let sortStp = this.state.sortingSteps;
    if (this.state.currentStep >= (noOfSteps.length - 1) ||
      this.state.currentStep <= (sortStp.length - 1)) {
      document.getElementById("unsrtbtn").disabled = true;
      return;
    }

    document.getElementById("arrsize").disabled = true;
    document.getElementById("speed").disabled = true;
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

    if (currentStp >= (this.state.algoSteps.length - 1)) {
      document.getElementById("plybtn").disabled = true;
      this.setState({
        animationOn: flag,
      });
      return;
    }

    this.setState({
      currentStep: currentStp,
      inputArray: this.state.algoSteps[currentStp],
      colorCode: this.state.barColors[currentStp],
      animationOn: flag,
    });

    if (currentStp <= (this.state.sortingSteps.length - 1)) {
      document.getElementById("arrsize").disabled = true;
      document.getElementById("unsrtbtn").disabled = true;
      document.getElementById("plybtn").disabled = false;
    } else if (currentStp >= (this.state.algoSteps.length - 1)) {
      document.getElementById("arrsize").disabled = false;
      document.getElementById("plybtn").disabled = true;
      document.getElementById("unsrtbtn").disabled = true;
    } else {
      document.getElementById("arrsize").disabled = true;
      document.getElementById("unsrtbtn").disabled = false;
      document.getElementById("plybtn").disabled = true;
    }

    document.getElementById("speed").disabled = false;
    document.getElementById("rstbtn").disabled = true;
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

    document.getElementById("arrsize").disabled = false;
    document.getElementById("speed").disabled = false;
    document.getElementById("rstbtn").disabled = false;
    document.getElementById("plybtn").disabled = true;
    document.getElementById("unsrtbtn").disabled = true;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("bckbtn").disabled = true;
    document.getElementById("frwdbtn").disabled = true;
  };

  handleBackward = () => {
    let currentStp = this.state.currentStep;

    if (currentStp === 0) {
      document.getElementById("arrsize").disabled = false;
      return;
    }

    if (currentStp === 1) {
      document.getElementById("plybtn").disabled = false;
      document.getElementById("bckbtn").disabled = true;
    }

    currentStp -= 1;

    document.getElementById("speed").disabled = false;
    document.getElementById("rstbtn").disabled = false;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("frwdbtn").disabled = false;

    this.setState({
      currentStep: currentStp,
      inputArray: this.state.algoSteps[currentStp],
      colorCode: this.state.barColors[currentStp],
    });

    if (currentStp <= (this.state.sortingSteps.length - 1)) {
      document.getElementById("arrsize").disabled = true;
      document.getElementById("unsrtbtn").disabled = true;
      document.getElementById("plybtn").disabled = false;
    } else if (currentStp >= (this.state.algoSteps.length - 1)) {
      document.getElementById("arrsize").disabled = false;
      document.getElementById("plybtn").disabled = true;
      document.getElementById("unsrtbtn").disabled = true;
    } else {
      document.getElementById("arrsize").disabled = true;
      document.getElementById("unsrtbtn").disabled = false;
      document.getElementById("plybtn").disabled = true;
    }

  };

  handleForward = () => {
    let currentStp = this.state.currentStep;

    document.getElementById("speed").disabled = false;
    document.getElementById("rstbtn").disabled = false;
    document.getElementById("plybtn").disabled = false;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("bckbtn").disabled = false;

    if (this.state.currentStep >= (this.state.algoSteps.length - 1)) {
      document.getElementById("frwdbtn").disabled = true;
      document.getElementById("plybtn").disabled = true;
      document.getElementById("unsrtbtn").disabled = true;
      return;
    }

    currentStp += 1;

    this.setState({
      currentStep: currentStp,
      inputArray: this.state.algoSteps[currentStp],
      colorCode: this.state.barColors[currentStp],
    });

    if (currentStp <= (this.state.sortingSteps.length - 1)) {
      document.getElementById("arrsize").disabled = true;
      document.getElementById("unsrtbtn").disabled = true;
      document.getElementById("plybtn").disabled = false;
    } else if (currentStp >= (this.state.algoSteps.length - 1)) {
      document.getElementById("arrsize").disabled = false;
      document.getElementById("plybtn").disabled = true;
      document.getElementById("unsrtbtn").disabled = true;
    } else {
      document.getElementById("arrsize").disabled = true;
      document.getElementById("unsrtbtn").disabled = false;
      document.getElementById("plybtn").disabled = true;
    }

  };

  /* Calculate the number of steps for the chosen
   * Algorithm with the same Bar heights.
   */
  selectAlgorithm = algos => () => {
    this.setState({
      algorithm: algos.name,
    });

    document.getElementById('selectedAlgorithm').innerHTML = ''; // To clear the previous text
    document.getElementById('selectedAlgorithm').innerHTML =
      algos.text;

    document.getElementById("arrsize").disabled = false;
    document.getElementById("speed").disabled = false;
    document.getElementById("rstbtn").disabled = false;
    document.getElementById("plybtn").disabled = false;
    document.getElementById("unsrtbtn").disabled = true;
    document.getElementById("pasbtn").disabled = true;
    document.getElementById("stpbtn").disabled = true;
    document.getElementById("bckbtn").disabled = true;
    document.getElementById("frwdbtn").disabled = false;

    /* Number of Steps need to be recalculated
     after changing the algorithm */
    this.clearColorCode();
    this.setState({
      /* Clears the existing steps of the previous algorithm */
      inputArray: this.state.origArray,
      algoSteps: [this.state.origArray],
      sortingSteps: [this.state.origArray],
      /* After generation, step would be 0 */
      currentStep: 0,
    }, () => this.generateAlgoSteps());
  };

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

    return (
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
          <p id="sizeArr">Array Size </p>
          <input id="arrsize" type="range" min={10}
            max={25} step={1} defaultValue={10} className="slider"
            onChange={this.updateArraySize} />
          <output htmlFor="range" id="outputSize">10</output>

          <p id="speedArr">Animation Speed</p>
          <input id="speed" type="range" min={100} max={2000}
            step={100} defaultValue={300}
            onChange={this.updateAnimationSpeed} />
          <output htmlFor="range" id="outputSpeed">300</output>

          <button id="rstbtn" onClick={this.generateArrayElements}>
            <Reset /></button>
          <button id="bckbtn" onClick={this.handleBackward}>
            <Backward /></button>
          <button id="frwdbtn" onClick={this.handleForward}>
            <Forward /></button>
          <button id="plybtn" onClick={this.handleSort}>
            <Sort /></button>
          <button id="unsrtbtn" onClick={this.handleUnsorting}>
            <Unsort /></button>
          <button id="pasbtn" onClick={this.handlePause}>
            <Pause /></button>
          <button id="stpbtn" onClick={this.handleStop}>
            <Stop /></button>
        </div>
        <div className='performance'>
          <p id='numberofOperations'></p>
        </div>
      </div>
    );
  }
}
export default ReversibleSortingVisualiser;
