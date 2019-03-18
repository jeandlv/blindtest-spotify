/*global swal*/

import React, { Component } from 'react';
import logoImage from '../../bin/logo.svg';
import loadingImage from '../../bin/loading.svg';
import spotifyApi from '../../spotifyApiKey.json';
import './App.css';
import Sound from 'react-sound';
import Button from '../Button/index';
import get from 'lodash/get';
import Game from '../Game';


const apiToken = spotifyApi.spotifyApiToken
const SWAL_ERROR = 'error';
const SWAL_SUCCESS = 'success';

const TEXT_LOADED_TRACKS = "Your library tracks were well loaded"
const TEXT_APPLICATION_LOADED = "Bonjour";

class App extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadTracksSaga();
  }

  newGame = () => {
    this.props.newGame(this.props.tracks.content);
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logoImage} className='App-logo' alt='logo'/>
          <h1 className='App-title'>Bienvenue sur le Blindtest</h1>
        </header>
        <div className='App-images'>
          {this.props.tracks.loaded ?
            (
              <div>
                {this.props.tracks.content.length > 2 ? (
                  <div>
                    <p>{TEXT_LOADED_TRACKS}</p>
                    <p>Nombre de musiques chargées : {this.props.tracks.content.length}</p>
                    <p>Nom de la première musique : {this.props.tracks.content[0].track.name}</p>
                    <p>Manche : {this.props.game.round}</p>
                    <p>Score : {this.props.score} points</p>
                    <Game endOfTheGame={this.newGame}/>
                  </div>
                ) : (
                  <p>Pas de musiques chargées</p>
                )
                }
              </div>
            ) : (
              <div>
                <p>{TEXT_APPLICATION_LOADED}</p>
                <img src={loadingImage} className='App-logo' alt='logo'/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;