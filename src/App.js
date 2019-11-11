import React from 'react';
import './App.css';

// React Redux
import { BrowserRouter as Router, Route } from "react-router-dom";

import Products from './components/Products'
import ProductDetails from './components/ProductDetails'


class App extends React.Component {
  render(){
    return (
          <Router>
            <div className="App">
                <Route exact path="/" component={Products} />
                <Route exact path="/productDetails" component={ProductDetails} />
                <br/>
                <br/>
            </div>
          </Router>
    );
  }
}

export default App;
