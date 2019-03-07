const tracks = (state = [], action) => {
	switch(action.type) {
		case 'LOAD_TRACKS' :
		  return action.tracks;
		 default:
		 	return state;
	}
}

export default tracks;
