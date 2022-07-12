import React, { Component } from 'react';
import './reversible-sorting-visualiser.css'
import Bar from '../components/bar.js'

//Class based component - ReversibleSortingVisualiser
export default class ReversibleSortingVisualiser extends Component {
 constructor(props) {
    super(props);

    this.state = {
        inputArray: [],
        barCount: 10, /* Number of Bars */
        algoSteps: [],
        currentStep: 0,
    };
 }

 // Renders the updated data after all the page is rendered
 componentDidMount() {
    this.generateArrayElements();
 }

 // Generate Random number in the range
 generateRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
 }

 // Generate random array elements 
 generateArrayElements = () => {
    let count = this.state.barCount;
    let array = [];

    for (let i = 0; i < count; i++) {
       array.push(this.generateRandomNum(0, 20));
    }

    // Save the array after the generation
    this.setState({
        inputArray: array,
        algoSteps: [array],
        barCount: count,
        /* After generation, step would be 0 */ 
        currentStep: 0, 
       });

    console.log(array);
  }

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
  }

  render() { 

    const barHeight = this.state.inputArray.map((val, idx) => 
         <Bar key={idx} arrIdx={idx} height={val} chgdArr={this.changeArrayElements} />
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
        </div> 
    );    
  }
}

    
