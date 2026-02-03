import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/services" component={Services} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
