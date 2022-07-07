//Component is a named export, so it must be destructed with {}
import React, { Component } from 'react';
//import React from 'react'; // default import
//Import the 'ReversibleSortingVisualiser' component
import ReversibleSortingVisualiser from './reversible-sorting-visualiser/reversible-sorting-visualiser.jsx';
import './App.css';

function App() {
    return(
    <div className='App'>
      <ReversibleSortingVisualiser>
      </ReversibleSortingVisualiser>
    </div>
    );    
}

//Function App is added to the export
export default App;
