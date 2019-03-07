import * as constants from './constants';

const initialState = {
	round: 1,
	score: 0
}

const progression = (state = initialState, action) => {
	switch(action.type) {
		case constants.CHANGE_SCORE_LOSE :
			return {round: state.round, score: state.score - 2};
		case constants.CHANGE_SCORE_SUCCESS :
			return {round: state.round, score: state.score + 3};
		case constants.NEW_ROUND :
			return {round: state.round + 1, score: state.score}; 
		 default:
		 	return state;
	}
}

export default progression;
