import React, { Component } from 'react'
import './App.css'

import info from './info.json'


class App extends Component {

  componentDidMount() {
      window.location = `https://discordapp.com/api/oauth2/authorize?response_type=code&client_id=${info.id}&scope=identify&redirect_uri=${encodeURI(info.URL)}`
  }

  render() {
    return (
      <div className="App">
        <h1>Relocating</h1>
      </div>
    );
  }
}

export default App;
