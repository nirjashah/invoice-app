import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InvoiceContainer from './components/InvoiceContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Invoice app</h1>
        </div>
        <InvoiceContainer />
      </div>
    );
  }
}

export default App;
