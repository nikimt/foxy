import React, { Component } from 'react';
import GameHeader from './gameheader.jsx';
import {Game, GameStatuses} from '../api/models/game.js';
import {userMarkGame} from '../api/methods/games.js';
import {userSteal} from '../api/methods/games.js';
import {userFind} from '../api/methods/games.js';

export default class GameBoard extends Component {
  handleCellClick(row, col) {
    let game = this.props.game;
    if (game.currentPlayerIndex() !== game.userIndex(this.props.user)) return;
    userMarkGame.call({gameId: game._id, row: row, col: col});
  }

  handleStealClick() {
    console.log('stolen rip');
    console.log(this);
    let game = this.props.game;
    userSteal.call({gameId: game._id});
  }

  handleFindClick() {
    console.log('stolen rip');
    console.log(this);
    let game = this.props.game;
    userFind.call({gameId: game._id});
  }

  handleBackToGameList() {
    this.props.backToGameListHandler();
  }

  renderCell(row, col) {
    let value = this.props.game.board[row][col];
    if (value === 0) return (<td>O</td>);
    if (value === 1) return (<td>X</td>);
    if (value === null) return (
      <td onClick={this.handleCellClick.bind(this, row, col)}></td>
    );
  }

renderAction() {
  let game = this.props.game;
  let currentPlayerID = this.props.user._id;
  let currentPlayerIndex = -1;

  if (game.status === GameStatuses.FINISHED) {
    return (
      <div className="ui bottom attached segment">
        Wooo you did it! Now go play again!
      </div>
      )
  }

  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].userId === currentPlayerID) {
      currentPlayerIndex = i;
    }
  }

  console.log('in action');
  console.log('index: ', currentPlayerIndex);
  console.log('current role ', game.players[currentPlayerIndex].role);

  if (game.players[currentPlayerIndex].role == "THIEF") {
    return (
      <div className="ui bottom attached segment">
        <button className="ui button" onClick={this.handleStealClick.bind(this)}>
          <i className="diamond icon"/>
          Steal a diamond
        </button>
      </div>
    )
  } else {
    return (
      <div className="ui bottom attached segment">
        <button className="ui button" onClick={this.handleFindClick.bind(this)}>
          <i className="search icon"/>
          Find a clue
        </button>
      </div>
    )
  }
}

  renderStatus() {
    let game = this.props.game;
    let status = "";
    if (game.status === GameStatuses.STARTED) {
      let playerIndex = game.currentPlayerIndex();
      // status = `Current player: ${game.players[playerIndex].username}`;
      if (game.totalDiamonds > game.totalClues) {
        status = "Thieves are winning!";
      } else if (game.totalClues > game.totalDiamonds) {
        status = "Detectives are winning!";
      } else if (game.totalClues == 0) {
        status = "Go click that button!";
      } else {
        status = ":O CLICK FASTER";
      }
    } else if (game.status === GameStatuses.FINISHED) {
      let playerIndex = game.winner();
      if (playerIndex === null) {
        status = "Finished: tie";
      } else {
        if (playerIndex == 'Thieves') {
          status = `Game over! The thieves won! Enjoy your tropical islands!`;
        } else {
          status = `Game over! The detectives won! Have fun in prison thieves!`;
        }
        // status = `Finished: winner: ${game.players[playerIndex].username}`;
      }
    }

    return (
      <div>{status}</div>
    )
  }

  render() {
    return (
      <div className="ui container center aligned">
        <GameHeader user={this.props.user}/>

        <button className="ui button blue" onClick={this.handleBackToGameList.bind(this)}>Back to Lobby</button>

        <div className="ui top attached header">
          <div className="ui centered grid">
            <div className="ui two column center aligned row">
              <div className="ui center aligned column">
                <div id="thieves-seg" className="ui center aligned segment">
                THIEVES<br />
                {/*this.props.game.players[0].username} as {this.props.game.players[0].role}<br/>Number of diamonds: {this.props.game.players[0].diamonds*/}
                {this.props.game.players[0].username}<br />
                {this.props.game.players[2].username}<br />
                {this.props.game.players[4].username}<br />
              </div>
              </div>
              <div className="ui column">
                <div id="detectives-seg" className="ui center aligned segment">
                DETECTIVES<br />
                {/*this.props.game.players[0].username} as {this.props.game.players[0].role}<br/>Number of diamonds: {this.props.game.players[0].diamonds*/}
                {this.props.game.players[1].username}<br />
                {this.props.game.players[3].username}<br />
                {this.props.game.players[5].username}<br />
              </div>
              </div>
            </div>
          </div>
        </div>
        <div id="status" className="ui attached center aligned segment">
          <div className="ui centered grid">
            <div className="ui two column center-aligned row">
              <div className="ui center aligned column">
                Total diamonds needed: {this.props.game.diamondsNeeded} <br /> Total diamonds stolen: {this.props.game.totalDiamonds}
              </div>
              <div className="ui center aligned column">
                Total clues needed: {this.props.game.cluesNeeded} <br /> Total clues found: {this.props.game.totalClues}
              </div>
            </div>
          </div>
          {this.renderStatus()}
        </div>

        {this.renderAction()}
      </div>
    )
  }
}