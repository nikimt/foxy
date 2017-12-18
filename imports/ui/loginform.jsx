import { Random } from 'meteor/random'
import React, { Component } from 'react';
import GameHeader from './gameheader.jsx';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      errorMsg: '',
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    let username = this.state.username.trim();
    if (username === '') {
      this.setState({errorMsg: 'name is required'});
      return;
    }

    this.setState({errorMsg: ''});
    Accounts.createUser({
      username: username,
      password: Random.secret()
    }, (error, result) => {
      if (error) {
        this.setState({errorMsg: error.reason});
      }
    });
  }

  render() {
    return (
      // <div className="ui container center-aligned">
      //    <GameHeader user={this.props.user}/>

      // <div className="ui container full-page">
          // <div className="ui segment center-aligned welcome-header">
            // <img className="ui image" src="/img/foxy.png" width="50%" height="50%"/>
          // </div>

          // <div className="arrow bounce">
            // <a className="fa fa-arrow-down fa-4x" href="#"></a>
          // </div>  
        // </div>

      <div className="ui container center-aligned">

        <div className="ui container center-aligned full-page">
          <div className="ui inverted center-aligned segment game-explanation-header">
                100<br /> Thieves
          </div>
          <div className="ui inverted segment game-explanation center-aligned">
                You and your friends are world-class thieves, robbing your way through banks and museums until you've accumulated enough wealth to disappear to a private island and live in luxury for the rest of your lives. Once you've reached a grand total of 100 diamonds per thief, congratulations! You have officially stolen enough to ensure your safety and comfort for the rest of your life. Be careful, though - the more you steal, the more attention you draw from some detectives who might be opposed to your redistribution of wealth. In fact, some of them might already be in your group...and if one of them gathers enough clues, they can prove that you're acquiring diamonds through less-than-legal means, and shut down your whole operation.
          </div>

        <div className="ui container center-aligned full-page">
          <div className="ui inverted center-aligned plswork">
            Ready to begin?
          </div>
          <form className={(this.state.errorMsg !== ''? 'error ': '') + "ui form"} name="login-form" onSubmit={this.handleSubmit.bind(this)}>

            <div className="ui error message">
              <div className="header">{this.state.errorMsg}</div>
            </div>

              <div className="ui input codename">
                <input type="text" onChange={this.handleUsernameChange.bind(this)} placeholder="Your Codename"/>
              </div>
              <div className="field">
                <input className="ui button" type="submit" value="Login"/>
              </div>
          </form>
        </div>
        </div>
      </div>
    )
  }
}