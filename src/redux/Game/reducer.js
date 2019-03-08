import * as constants from './constants';

const initialState = {
	currentTrack: {},
	proposedTracks: [],
	round: 0
}

const shuffleArray = array => {
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

const getRandomNumber = x => {
  return Math.floor(Math.random() * x);
}

const getRandomTrack = (tracks) => {
	return tracks.length > 2 ? tracks[getRandomNumber(tracks.length)] : {};
}

const pickNewTracks = (tracks, round) => {
	let currentTrack = getRandomTrack(tracks);
	let secondTrack = getRandomTrack(tracks);
	let thirdTrack = getRandomTrack(tracks);
	return {
		currentTrack: currentTrack,
	  	proposedTracks: shuffleArray([currentTrack, secondTrack, thirdTrack]),
	  	round: round + 1
	};
}

const game = (state = initialState, action) => {
	switch(action.type) {
		case constants.NEW_GAME :
			return pickNewTracks(action.loadedTracks, state.round);
		default:
		 	return state;
	}
}

export default game;
