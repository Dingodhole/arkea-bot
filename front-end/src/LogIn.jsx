import React, { Component } from 'react';
import { parse } from 'qs'

import info from './info.json'

class App extends Component {

  constructor(props) {
    super(props)

    const code = parse(props.location.search.substr(1))

    this.state = {
      code,
      token: ""
    }
  }

  async componentDidMount() {
    console.log(this.state.code.code);
    try {
      let req = await fetch(`https://discordapp.com/api/oauth2/token?client_id=${info.id}&client_secret=${info.secret}&grant_type=authorization_code&code=${this.state.code.code}&redirect_uri=${encodeURI(info.URL)}`,
                {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
      let json = await req.json()
      console.log(json)
      this.setState({
        token: json.access_token
      })
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="App">
        <h1></h1>
      </div>
    );
  }
}

export default App;
