import React, { Component } from 'react';

import './App.css';

//'App' Class based component
class App extends Component {

  // state initialisation
  state = {  
    inputArray: [],
    algoSteps: [],
    eleColorKey: [],
    elementColors: [],
    timeout: [],
    currentStep: 0, 
    count: 10,
    delayTime: 300,
    algorithmName: ''
  } 

  // Generate Random number in the range
  generateRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Generate array elements with specified range
  generateArrayElements = () => {
    // Save the bar count
    let barCount = this.state.count;
    let inputArr = [];
    
    // Generate array of elemetns 
    for (let i = 0; i < barCount; i++) {
       inputArr.push(this.generateRandomNum(50, 200));
    }

    //This can be seen in the inspect->console
    console.log(inputArr);
  }


  render() { 
    return(
    <div className='App'>
      {this.generateArrayElements()}
    </div>
    );    
  }

}

//Class is added to the export
export default App;
