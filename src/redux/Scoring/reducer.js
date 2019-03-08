import * as constants from './constants';


const score = (state = 0, action) => {
	switch(action.type) {
		case constants.CHANGE_SCORE_LOSE :
			return state - 2;
		case constants.CHANGE_SCORE_SUCCESS :
			return state + 3; 
		 default:
		 	return state;
	}
}

export default score;
