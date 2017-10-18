import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InvoiceContainer from './components/InvoiceContainer';
import InvoiceListComponent from './components/InvoiceListComponent';
import {BrowserRouter, Link, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Invoice app</h1>
              <div>
                <Link to={`/`}>
                    Home
                </Link>
              </div>
              <div>
                <Link to={`/invoices`}>
                    Invoice List
                </Link>
              </div>
            </div>
            <Route exact={true} path="/" component={InvoiceContainer}/>
            <Route path="/invoices" component={InvoiceListComponent}/>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
