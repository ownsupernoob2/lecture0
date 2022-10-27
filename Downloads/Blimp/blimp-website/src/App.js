import React, { Component } from 'react';
import Router from "./components/routes/Router";
import './App.css';
import './components/styles/about.css';
import './components/styles/navbar.css';
import './components/styles/projects.css';


class App extends Component {
  render() {
    return (
      <div>
        <Router/>
      </div>
    );
  }
}

export default App;
