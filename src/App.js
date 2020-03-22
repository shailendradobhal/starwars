import React from 'react'
import './App.css'
import Login from './components/Login'
import Search from './components/Search'
import PlanetDetail from './components/PlanetDetail'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Router basename="/starwars">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/search' component={Search} />
          <Route path='/search/planet/:name'>
            <PlanetDetail />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
