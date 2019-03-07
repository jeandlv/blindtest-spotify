const currentTrack = (state = {}, action) => {
	switch(action.type) {
		case 'SELECT_CURRENT_TRACK' :
		  return action.track;
		 default:
		 	return state;
	}
}

export default currentTrack;
