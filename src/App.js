import React, { Component } from 'react';
import Title from './components/Title'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Title content="Awesome game" />
        </div>
      </div>
    );
  }
}

export default App;
