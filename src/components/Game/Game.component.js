/*global swal*/

import React, { Component } from 'react';
import './Game.css';
import Sound from 'react-sound';
import uuid from 'uuid';
import get from 'lodash/get';

import Button from '../Button/index';
import AlbumCover from '../AlbumCover/index'


const SWAL_ERROR = 'error';
const SWAL_SUCCESS = 'success';

class Game extends Component {

    constructor() {
      super();
      this.trackTimer = null;
    }

    componentDidMount() {
        this.setTimer();
    }

    setTimer = () => {
        this.trackTimer = setTimeout(() => {this.props.endOfTheGame(); this.setTimer()}, 30000);
    }

    checkAnswer = (answerId) => {
        if (answerId === this.props.game.currentTrack.track.id) {
            clearTimeout(this.trackTimer)
            swal('Bravo', 'Vous avez la boonne réponse', SWAL_SUCCESS)
            .then( () => {
                this.props.changeScoreWhenWinning();
                this.props.endOfTheGame();
                this.setTimer();
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

    render() {
        const currentTrack = this.props.game.currentTrack;
        const tracksToPropose = this.props.game.proposedTracks;

        return(
            <div>
                <div className='Game-track'>
                    <AlbumCover track={currentTrack.track}/>
                    <Sound url={currentTrack.track.preview_url} playStatus={Sound.status.PLAYING}/>
                </div>
                <div className='Game-buttons'>
                    {
                        tracksToPropose.map(item => (
                            <Button key={uuid.v4()} onClick={() => this.checkAnswer(item.track.id)}>{item.track.name}</Button>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Game;