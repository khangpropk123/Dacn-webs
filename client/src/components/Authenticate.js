import React, { Component } from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Switch, Route } from 'react-router-dom'
class App extends Component {
 
  render() {
    return (
      <Switch>
        <Route exact path='/authenticate/login' component={SignIn}/>
        <Route path='/authenticate/register' component={SignUp}/>
      </Switch>
    )
  }
}

export default App
