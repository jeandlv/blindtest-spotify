import * as constants from './constants';

const tracks = (state = [], action) => {
	switch(action.type) {
		case constants.LOAD_TRACKS :
		  return action.tracks;
		 default:
		 	return state;
	}
}

export default tracks;
