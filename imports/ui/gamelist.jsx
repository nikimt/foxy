import React, { Component } from 'react';
import GameHeader from './gameheader.jsx';
import {Game, GameStatuses} from '../api/models/game.js';
import {newGame, userJoinGame, userLeaveGame} from '../api/methods/games.js';

export default class GameList extends Component {
  handleNewGame() {
    newGame.call({});
  }

  handleLeaveGame(gameId) {
    userLeaveGame.call({gameId: gameId});
  }

  handleJoinGame(gameId) {
    userJoinGame.call({gameId: gameId});
  }

  handleEnterGame(gameId) {
    this.props.enterGameHandler(gameId);
  }

  activeGames() {
    return _.filter(this.props.games, (game) => {
      return game.status === GameStatuses.WAITING || game.status === GameStatuses.STARTED;
    });
  }

  myCurrentGameId() {
    let game = _.find(this.activeGames(), (game) => {
      return game.userIndex(this.props.user) !== null;
    });
    return game === undefined? null: game._id;
  }

  renderPlayers(game) {
    let player1 = game.players.length > 0? game.players[0].username: '(waiting)';
    let player2 = game.players.length > 1? game.players[1].username: '(waiting)';
    let player3 = game.players.length > 2? game.players[2].username: '(waiting)';
    let player4 = game.players.length > 3? game.players[3].username: '(waiting)';
    let player5 = game.players.length > 4? game.players[4].username: '(waiting)';
    let player6 = game.players.length > 5? game.players[5].username: '(waiting)';

    return (
      <div className="ui grid">
        <div className="eight wide column">
          <i className="user icon"></i> {player1}<br />
          <i className="user icon"></i> {player3}<br />
          <i className="user icon"></i> {player5}
        </div>
        <div className="eight wide column">
          <i className="user icon"></i> {player2}<br />
          <i className="user icon"></i> {player4}<br />
          <i className="user icon"></i> {player6}
        </div>
      </div>
    )
  }

  render() {
    return (
    <div className="ui container">
      <GameHeader user={this.props.user}/>

      <h1 id="list-of-games" className="ui inverted top attached segment">List of games</h1>
      <div id="no-border" className="ui inverted attached segment">
        {this.myCurrentGameId() === null? (
          <div>
            <button className="ui green button" onClick={this.handleNewGame.bind(this)}><i className="icon plus"></i>New Game</button>
          </div>
        ): null}
      </div>
      <div id="no-border" className="ui inverted attached segment">
        <div className="ui three stackable cards">
          {this.activeGames().map((game, index) => {
            return (
              <div key={game._id} id="dark" className="card">
                <div className="content">
                  <div id="cardheader" className="header">
                    {game.status === GameStatuses.WAITING? (
                      <span className="ui right white corner label">
                        <i className="inverse add user icon"/>
                      </span>
                    ): null}
                    Game {index+1}
                  </div>
                </div>
                <div className="content">
                    {this.renderPlayers(game)}
                </div>
                  {/* can leave only if user is in the game, and the game is not started */}
                  {this.myCurrentGameId() === game._id && game.status === GameStatuses.WAITING? (
                    <button className="ui red button" onClick={this.handleLeaveGame.bind(this, game._id)}>Leave</button>
                  ): null}
                  {/* can join only if user is not in any game, and the game is not started */}
                  {this.myCurrentGameId() === null && game.status === GameStatuses.WAITING? (
                    <button className="ui green button" onClick={this.handleJoinGame.bind(this, game._id)}>Join</button>
                  ): null}
                  {/* can enter only if the game is started */}
                  {game.status === GameStatuses.STARTED? (
                    <div className="ui bottom attached inverted basic blue button" onClick={this.handleEnterGame.bind(this, game._id)}>Enter</div>
                  ): null}
                  {/* just a invisible dummy button to make up the space */}
                
                </div>
            )
          })}
        </div>
      </div>
    </div>
    )
  }
}