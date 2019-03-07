const score = (state = 0, action) => {
	switch(action.type) {
		case 'CHANGE_SCORE' :
		  return state + action.scoreToAdd;
		 default:
		 	return state;
	}
}

export default score;
