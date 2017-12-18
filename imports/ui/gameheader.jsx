import React, { Component } from 'react';

export default class GameBoard extends Component {
  handleLogout() {
    Meteor.logout();
  }
  render() {
    return (
      <div className="ui secondary menu inverted">
        <div className="header item" id="headername">
          <i className="diamond icon"/>
          100 Thieves
        </div>

        {this.props.user? (
          <div className="right menu">
            <div className="item">
              <i className="user icon"/>
              {this.props.user.username}
            </div>
            <a className="item" onClick={this.handleLogout.bind(this)}>
              Logout
            </a>
          </div>
        ): null}
      </div>
    )
  }
}