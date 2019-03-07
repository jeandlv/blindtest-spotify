import * as constants from './constants';

const initialState = {
	content: [],
	loaded: false
}

const tracks = (state = initialState, action) => {
	switch(action.type) {
		case constants.LOAD_TRACKS :
		  return {content: action.tracks, loaded: false};
		case constants.READY_TO_PLAY :
		  return {content: state.content, loaded: true};
		 default:
		 	return state;
	}
}

export default tracks;
