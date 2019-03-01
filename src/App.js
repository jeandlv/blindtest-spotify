/*global swal*/

import React, { Component } from 'react';
import logoImage from './logo.svg';
import loadingImage from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQAK_5WNlaRM4k4XwioZuwQRlscpT7Umo0OeL_NhsMTsn0D47Z7tryWF2bHw6gSXsvGNvuAnMseItA4PwO3UPE01lIVl6GI2AwJLtvjFgU3OosZUDWk1d893l4PtV1phtsYlECsF61N6O7OrYa4MW02P';

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
      answerId: ""
    };
    this.checkAnswer = this.checkAnswer.bind(this);
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
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      this.setState({
        text: "Your library tracks were well loaded",
        tracks: data.items,
        songsLoaded: true,
        answerId: data.items[0].track.id
      });
    })
  }

  checkAnswer(answerId) {
    console.log("answerId :", answerId)
    console.log("this.state.answerId :", this.state.answerId)
    if (answerId === this.state.answerId) {
      swal('Bravo', 'Vous avez la bonne réponse', 'success');
    }
    else {
      swal('Echec', 'Vous avez la mauvaise réponse', 'error')
    }
  }

  render() {
    const firstTrack = this.state.tracks[0];
    const secondTrack = this.state.tracks[1];
    const thirdTrack = this.state.tracks[2];

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
                <p>Nombre de musiques chargées : {this.state.tracks.length}</p>
                <p>Nom de la première musique : {this.state.tracks[0].track.name}</p>
                <AlbumCover track={this.state.tracks[0].track}/>
                <Sound url={this.state.tracks[0].track.preview_url} playStatus={Sound.status.PLAYING}/>
              </div>
            ) : (
              <img src={loadingImage} className="App-logo" alt="logo"/>
            )
          }
        </div>
        <div className="App-buttons">
          {this.state.songsLoaded ? 
            (
              <div>
                <Button onClick={() => this.checkAnswer(firstTrack.track.id)}>{firstTrack.track.name}</Button>
                <Button onClick={() => this.checkAnswer(secondTrack.track.id)}>{secondTrack.track.name}</Button>
                <Button onClick={() => this.checkAnswer(thirdTrack.track.id)}>{thirdTrack.track.name}</Button>
              </div>
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