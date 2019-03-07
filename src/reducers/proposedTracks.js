const proposedTracks = (state = [], action) => {
	switch(action.type) {
		case 'SELECT_PROPOSED_TRACK' :
		  return action.tracks;
		 default:
		 	return state;
	}
}

export default proposedTracks;
