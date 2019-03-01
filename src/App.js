/*global swal*/

import React, { Component } from 'react';
import logoImage from './logo.svg';
import loadingImage from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQAglEA9MhNhEuaQe5QSKZ3FpXf7NbeSVe4Lun157jvn-MGV9z4_UXOF7QGTksh4sjJ_xVPUk8y88ce6NJjaZC4f3xDzItJPt9cPh1n46XZFb0NNHa7hpGpZ7yobL0Qe3SnxLMD9t1u-YqEJ_oPyBsIe';

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
      songsLoaded: false
    };
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
        songsLoaded: true
      });
    })
  }

  render() {
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
              <div></div>
            ) : (
              <img src={loadingImage} className="App-logo" alt="logo"/>
            )
          }
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;
