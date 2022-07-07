import React, { Component } from 'react';
import './reversible-sorting-visualiser.css'
import Bar from '../components/bar.js'

//Class based component
export default class ReversibleSortingVisualiser extends Component {
 constructor(props) {
    super(props);

    this.state = {
        inputArray: [],
        //Can change this to increase the no of bars
        barCount: 10,
        algoSteps: [],
        currentStep: 0,
    };
 }

 //component loads for the first time, resets the array elements. 
 componentDidMount() {
    console.log('componentDidMount');
    this.generateArrayElements();
 }
 // Generate Random number in the range
 generateRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
    //return Math.floor(Math.random() * (max - min + 1) + min);
 }

 /* this will be called when the 
  generate new arry buttong is clicked */
 generateArrayElements = () => {
    // Save the bar count
    let count = this.state.barCount;
    let array = [];
    
    // Generate array of elemetns 
    for (let i = 0; i < count; i++) {
       // If you go big value for max,  
    // screen scrolling might require
       array.push(this.generateRandomNum(50, 200));
    }

    // Save the array before messing up
    this.setState({
        inputArray: array,
        algoSteps: [array],
        barCount: count,
        currentStep: 0, /* While regenerating the array, step would be 0 */ 
       });

    //This can be seen in the inspect->console
    console.log(array);
  }

  /* Array elements changes should be saved. */
  changeArrayElements = (idx, val) => {
   let chgdArray = this.state.inputArray;
   chgdArray[idx] = val;
   console.log({idx, val});
   this.setState({
      inputArray: chgdArray,
      algoSteps: [chgdArray],
      currentStep: 0, /* While regenerating the array, step would be 0 */ 
     });
     console.log({chgdArray});
  }

  render() { 

    // Key is for number of bars(barCount), 
    // if the parameter is idx, val, it throws the duplicate error. 
    const barHeight = this.state.inputArray.map((val, idx) => 
         <Bar key={idx} arrIdx={idx} height={val} chgdArr={this.changeArrayElements} />
    );
   /* // The below lines or the above lines both mean same
    const barHeight = this.state.inputArray.map((idx, val) => {
          return <Bar key={idx} index={idx} ength={val}/>;
    });
    */
    console.log(barHeight);
    // Curly braces represent the java script inside return 
    // As barHeight is placed between the array-container, 
    // Array continer should be taken care.
    return( 
        <div className='ReversibleSortingVisualiser'>
            <div className='array-bar'>
               <div className='arrayOutline container'>
                  {barHeight}
               </div>
            </div>
        </div> 
    );    
  }
}

    
