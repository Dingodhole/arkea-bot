import React from 'react'
import ReactDOM from 'react-dom'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import App from './App'
import LoggedIn from './LogIn'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const theme = createMuiTheme()

function Application() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route path="/login" component={LoggedIn}/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<Application />, document.getElementById('root'));
