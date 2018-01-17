import React, { Component } from 'react';
import { parse } from 'qs'

import { CircularProgress } from 'material-ui/Progress'

import info from './info.json'

class App extends Component {

  constructor(props) {
    super(props)

    const code = parse(props.location.search.substr(1))

    this.state = {
      code,
      loading: true,
      id: "",
      rolesList: []
    }
  }

  async componentDidMount() {
    try {
      let req = await fetch(`https://discordapp.com/api/oauth2/token?client_id=${info.id}&client_secret=${info.secret}&grant_type=authorization_code&code=${this.state.code.code}&redirect_uri=${encodeURI(info.URL)}`,
                {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
      let json = await req.json()
      let token = json.access_token
      let user = await fetch(`https://discordapp.com/api/users/@me`,
                {
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
      let userJson = await user.json()
      let id = userJson.id
      let memberRolesRaw = await fetch(`https://discordapp.com/api/guilds/${info.guild}/members/${id}`,
                {
                  headers: {
                    'Authorization': 'Bot ' + info.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }).then(obj => (obj.json()))
      let memberRoles = memberRolesRaw.roles
      let guildRoles = await fetch(`https://discordapp.com/api/guilds/${info.guild}/roles`,
                {
                  headers: {
                    'Authorization': 'Bot ' + info.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }).then(obj => (obj.json()))

      let rolesList = []

      guildRoles.forEach(role => {
        if(memberRoles.includes(role.id) && role.color === 15) {
          rolesList.push({
            has: true,
            name: role.name,
            id: role.id
          })
        } else if (role.color === 15){
          rolesList.push({
            has: false,
            name: role.name,
            id: role.id
          })
        }
      })

      this.setState({
        loading: false,
        id,
        rolesList
      })
    } catch(e) {
      console.log(e)
    }
  }

  render() {

    const content = this.state.loading ?
      <CircularProgress />
    :
      <div>
        <p>{this.state.id}</p>
        {this.state.rolesList.map(item => (
          <p className={item.has ? "has" : "not"}>{item.name}</p>
        ))}
      </div>

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
