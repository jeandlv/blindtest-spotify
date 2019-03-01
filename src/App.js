/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQACA64fs0s8V6H7My8QaMrFcmCMp0PSmnSOfcVSkValrWx3PJ9IF9T1sOaMB6ZAUd_5yTsaNjVaxySe3OR74o2gpcWQruS8FFx398f4LLR--DZd6YT6q_YMU-DqXJIfdMgvJI-HrcOTnrzp2X8ytzLm';

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
      tracks: []
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
        tracks: data.items
      });
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          <p>{this.state.text}</p>
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;
