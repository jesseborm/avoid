import React, { Component } from 'react';
import Loading from './components/Loading'
import LoadErrorMessage from './components/LoadErrorMessage'

import Title from './components/Title'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Title content="Awesome game" />
          <Loading />
          {/* <Navigation /> */}
          {/* { this.props.children } */}
          <LoadErrorMessage />
        </div>
      </div>
    );
  }
}

export default App;
