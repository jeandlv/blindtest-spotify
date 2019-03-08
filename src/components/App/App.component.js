/*global swal*/

import React, { Component } from 'react';
import logoImage from '../../bin/logo.svg';
import loadingImage from '../../bin/loading.svg';
import noCoverImage from '../../bin/no-cover-image.png';
import spotifyApi from '../../spotifyApiKey.json';
import './App.css';
import Sound from 'react-sound';
import Button from '../Button/index';
import get from 'lodash/get';
import uuid from 'uuid';

const apiToken = spotifyApi.spotifyApiToken
const ALBUM_COVER_SIZE = 400;
const SWAL_ERROR = 'error';
const SWAL_SUCCESS = 'success';
const ALT_TEXT_COVER_IMG = "Album Cover Image";

const TEXT_LOADED_TRACKS = "Your library tracks were well loaded"
const TEXT_APPLICATION_LOADED = "Bonjour";

class App extends Component {

  constructor() {
    super();
    this.trackTimer = null;
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      data.items = get(data, 'items', [])
      this.props.loadTracks(data.items);
      this.props.newGame(data.items);
      this.setTimer();
      this.props.readyToPlay();
    })
  }

  setTimer = () => {
    let self = this;
    this.trackTimer =  setTimeout(function() {self.changeTrack()}, 30000);
  }

  checkAnswer = (answerId) => {
    if (answerId === this.props.game.currentTrack.track.id) {
      clearTimeout(this.trackTimer)
      swal('Bravo', 'Vous avez la boonne réponse', SWAL_SUCCESS)
      .then( () => {
          this.props.changeScoreWhenWinning();
          this.changeTrack();
        }
      );
    }
    else {
      swal('Echec', 'Vous avez la mauvaise réponse', SWAL_ERROR)
      .then( () => {
          this.props.changeScoreWhenLosing();
        }
      );
    }
  }

  changeTrack = () => {
    clearTimeout(this.trackTimer);
    this.props.newGame(this.props.tracks.content);
    this.setTimer();
  }

  render() {
    const currentTrack = this.props.game.currentTrack;
    const tracksToPropose = this.props.game.proposedTracks;

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
                {this.props.tracks.content.length > 0 ? (
                  <div>
                    <p>{TEXT_LOADED_TRACKS}</p>
                    <p>Nombre de musiques chargées : {this.props.tracks.content.length}</p>
                    <p>Nom de la première musique : {this.props.tracks.content[0].track.name}</p>
                    <p>Manche : {this.props.game.round}</p>
                    <p>Score : {this.props.score} points</p>
                    <AlbumCover track={currentTrack.track}/>
                    <Sound url={currentTrack.track.preview_url} playStatus={Sound.status.PLAYING}/>
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
        <div className='App-buttons'>
          {this.props.tracks.loaded  && this.props.tracks.content.length > 2 ? 
            (
              tracksToPropose.map(item => (
                  <Button key={uuid.v4()} onClick={() => this.checkAnswer(item.track.id)}>{item.track.name}</Button>
              ))
            ) : (
              <div/>
            )
          }
        </div>
      </div>
    );
  }
}

class AlbumCover extends Component {

  render() {
    const coverImageSrc = get(this.props.track, 'album.images[0].url', noCoverImage);
    return (<img alt={ALT_TEXT_COVER_IMG} src={coverImageSrc} style={{ width: ALBUM_COVER_SIZE, height: ALBUM_COVER_SIZE }} />);
  }
}

export default App;
