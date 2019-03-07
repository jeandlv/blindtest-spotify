const round = (state = 0, action) => {
	switch(action.type) {
		case 'NEXT_ROUND' :
		  return state + 1;
		 default:
		 	return state;
	}
}

export default round;
