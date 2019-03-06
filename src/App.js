/*global swal*/

import React, { Component } from 'react';
import logoImage from './logo.svg';
import loadingImage from './loading.svg';
import noCoverImage from './no-cover-image.png';
import spotifyApi from './spotifyApiKey.json';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import get from 'lodash/get';

const apiToken = spotifyApi.spotifyApiToken
const ALBUM_COVER_SIZE = 400;
const SWAL_ERROR = 'error';
const SWAL_SUCCESS = 'success'

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.trackTimer = null;
    this.state = {
      text: '',
      tracks: [],
      songsLoaded: false,
      currentTrack: '',
    };
  }

  componentDidMount() {
    this.setState({
      text: 'Bonjour'
    });
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      data.items = get(data, 'items', [])
      this.setState({
        text: 'Your library tracks were well loaded',
        tracks: data.items,
        songsLoaded: true,
        currentTrack: data.items.length > 0 ? data.items[getRandomNumber(data.items.length)] : {}
      });
      this.setTimer();
    })
  }

  setTimer = () => {
    let self = this;
    this.trackTimer = setTimeout(function() {self.changeTrack()}, 30000)
  }

  checkAnswer = (answerId) => {
    if (answerId === this.state.currentTrack.track.id) {
      clearTimeout(this.trackTimer)
      swal('Bravo', 'Vous avez la boonne réponse', SWAL_SUCCESS)
      .then( () => {
          this.changeTrack();
        }
      );
    }
    else {
      swal('Echec', 'Vous avez la mauvaise réponse', SWAL_ERROR)
    }
  }

  changeTrack = () => {
    clearTimeout(this.trackTimer)
    this.setState({
      currentTrack : this.getRandomTrack(),
      text: 'Nouvelle musique'
    })
    this.setTimer();
  }


  getRandomTrack = () => {
    return this.state.tracks.length > 2 ? this.state.tracks[getRandomNumber(this.state.tracks.length)] : {};
  }

  render() {
    const firstTrack = this.state.currentTrack;
    const secondTrack = this.getRandomTrack();
    const thirdTrack = this.getRandomTrack();
    const tracks = shuffleArray([firstTrack, secondTrack, thirdTrack]);

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logoImage} className='App-logo' alt='logo'/>
          <h1 className='App-title'>Bienvenue sur le Blindtest</h1>
        </header>
        <div className='App-images'>
          <p>{this.state.text}</p>
          {this.state.songsLoaded ? 
            (
              <div>
                {this.state.tracks.length > 0 ? (
                  <div>
                    <p>Nombre de musiques chargées : {this.state.tracks.length}</p>
                    <p>Nom de la première musique : {this.state.tracks[0].track.name}</p>
                    <AlbumCover track={firstTrack.track}/>
                    <Sound url={firstTrack.track.preview_url} playStatus={Sound.status.PLAYING}/>
                  </div>
                ) : (
                  <p>Pas de musiques chargées</p>
                )
                }
              </div>
            ) : (
              <img src={loadingImage} className='App-logo' alt='logo'/>
            )
          }
        </div>
        <div className='App-buttons'>
          {this.state.songsLoaded  && this.state.tracks.length > 2 ? 
            (
              tracks.map(item => (
                  <Button onClick={() => this.checkAnswer(item.track.id)}>{item.track.name}</Button>
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
  
  constructor(props) {
    super(props);
  }

  render() {
    const coverImageSrc = get(this.props.track, 'album.images[0].url', noCoverImage);
    return (<img src={coverImageSrc} style={{ width: ALBUM_COVER_SIZE, height: ALBUM_COVER_SIZE }} />);
  }
}

export default App;
