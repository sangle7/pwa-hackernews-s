import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Menubar, Container, Item} from './components'
import config from './utils/config'
const About = (props) => (
  <h1>ABOUT ME</h1>
)
const Error = (props) => (
  <h1>SORRY 404</h1>
)
const Userpage = (props) => (
  <h1>{props.match.params.username}</h1>
)
const User = ({ match }) => {
  const MenuProps = {
    match,
    menu: config.menu
  }
  return <Menubar {...MenuProps}/>
}
const App = (props) => {
  const MenuProps = {
    menu: config.menu
  }
  return (
    <Router>
      <div className="App">
      <Route component={User}></Route>
        {/* <Menubar {...MenuProps}/> */}
        <main className="mainContainer">
          <Switch>
            <Route exact path="/about" component={About}></Route>
            <Route path="/item/:itemid" component={Item}></Route>
            <Route path="/user/:username" component={Userpage}></Route>
            <Route path="/:name/:page" component={Container}></Route>
            <Route component={Error}></Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
};

export default App;
