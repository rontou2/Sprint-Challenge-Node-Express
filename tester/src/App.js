import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/home';
import Details from './components/details';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path="/" component={Home} />
	  <Route path ="/projects/:id" component={Details} />
      </div>
    );
  }
}

export default App;
