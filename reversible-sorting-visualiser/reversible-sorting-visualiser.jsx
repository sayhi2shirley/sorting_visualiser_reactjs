import React, { Component } from 'react';
import './reversible-sorting-visualiser.css'
import Bar from '../components/bar.js'
import bubbleSortAlgorithmA from '../algorithms/unsort_bubblesort_algoA.js'

//Class based component - ReversibleSortingVisualiser
export default class ReversibleSortingVisualiser extends Component {
 constructor(props) {
    super(props);

    this.state = {
        inputArray: [],
        barCount: 10,   /* Number of Bars */
        indices: [],
        
        colorCode: [],
        barColors: [],
        timeout: [],
        delay: 300,
      
        algoSteps: [],  /* Number of steps the alogrithm takes */
        currentStep: 0,
        algorithm: '',
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

    for (let i = 0; i < count; i++) {
       bar.push(this.generateRandomNum(0, 20));
       idx.push(i);
    }

    // Save the array after the generation
    this.setState({
        inputArray: bar,
        algoSteps: [bar],
        barCount: count,
        indices: idx,
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
      currentStep: 0, 
     });
  };

  generateAlgoSteps = () => {
      let array = this.state.inputArray.slice();
      let steps = this.state.algoSteps.slice();
      let colors = this.state.barColors.slice();
      let idx = this.state.indices.slice();

      bubbleSortAlgorithmA(array, idx, 0, steps, colors);
      this.setState({
         algoSteps: steps,
         barColors: colors, 
        });
  };

  /* set colorCode, currentStep, timeout, and delay */
  handlePlay = () => {
     let noOfSteps = this.state.algoSteps;
     let color = this.state.barColors;
     
     this.clearTimeout();
     let timeOut = [];
     let itr = 0;
     
     /* Execution will stop when noOfSteps - currentStep */
     while (itr < noOfSteps.length - this.state.currentStep) {
         let valTimeout = setTimeout(() => {
            let valCurrentStep = this.state.currentStep;
            this.setState({
               inputArray: noOfSteps[valCurrentStep],
               colorCode: color[valCurrentStep],
               currentStep: valCurrentStep + 1,
            });
            timeOut.push(valTimeout);
         }, this.state.delay * itr);
         itr++;
     }
     this.setState({
      timeout: timeOut,
     });
     
  };

  clearTimeout = () => {
     this.state.timeout.forEach(timeoutVal => this.clearTimeout(timeoutVal));
     this.setState({timeout: []});
  };

  //clearColorKey
  clearColorCode = () => {
     let numOfBars = new Array(this.state.barCount).fill(0);
     this.setState({colorCode: numOfBars, barColors: [numOfBars]});
  };

  render() { 

    const barHeight = this.state.inputArray.map((val, idx) => 
         <Bar key={idx} arrIdx={idx} height={val} 
              clrCode={this.state.colorCode[idx]} 
              chgdArr={this.changeArrayElements} />
    );
    /* // The below lines or the above lines both mean same
    const barHeight = this.state.inputArray.map((idx, val) => {
          return <Bar key={idx} index={idx} ength={val}/>;
    });
    */
    
    return( 
        <div className='ReversibleSortingVisualiser'>
            <div className='array-bar'>
               <div className='arrayOutline container'>
                  {barHeight}
               </div>
            </div>
            <button onClick={this.handlePlay}>Play</button>
        </div>     
    );    
  }
}

    
