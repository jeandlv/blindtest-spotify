/*global swal*/

import React, { Component } from 'react';
import logoImage from './logo.svg';
import loadingImage from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQAGMW8ly5JUiYt9LG5A3nV3_KZ1WzggEt-e9O0JeZ0wgRIPMO43yhEv6p82P6vue-4gV3uilySx_A0b2mDo0q5Or9lWMnR7pBHExDsl_KK5yRseYhuEmmkt1CdeeG0RI1OBTmnwwQoDRoA54D_DpWFN';

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
    this.state = {
      text: "",
      tracks: [],
      songsLoaded: false,
      currentTrack: ""
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
  }

  componentDidMount() {
    this.setState({
      text: "Bonjour"
    });
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        text: "Your library tracks were well loaded",
        tracks: data.items !== undefined ? data.items : [],
        songsLoaded: true,
        currentTrack: data.items !== undefined && data.items.length > 0 ? data.items[getRandomNumber(data.items.length)] : ""
      });
    })
  }

  checkAnswer(answerId) {
    if (answerId === this.state.currentTrack.track.id) {
      swal('Bravo', 'Vous avez la boonne réponse', 'success')
        .then(this.changeTrack);
    }
    else {
      swal('Echec', 'Vous avez la mauvaise réponse', 'error')
    }
  }

  changeTrack() {
    this.setState({
      currentTrack : this.state.tracks[getRandomNumber(this.state.tracks.length)],
      text: "Nouvelle musique"
    })
  }

  render() {
    const firstTrack = this.state.currentTrack;
    const secondTrack = this.state.tracks.length > 2 ? this.state.tracks[getRandomNumber(this.state.tracks.length)] : "";
    const thirdTrack = this.state.tracks.length > 2 ? this.state.tracks[getRandomNumber(this.state.tracks.length)] : "";
    const tracks = shuffleArray([firstTrack, secondTrack, thirdTrack]);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logoImage} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
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
              <img src={loadingImage} className="App-logo" alt="logo"/>
            )
          }
        </div>
        <div className="App-buttons">
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
    const src = this.props.track.album.images[0].url;
    return (<img src={src} style={{ width: 400, height: 400 }} />);
  }
}

export default App;