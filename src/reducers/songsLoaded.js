const songsLoaded = (state = false, action) => {
	switch(action.type) {
		case 'LOAD_TRACKS' :
		  return true;
		 default:
		 	return state;
	}
}

export default songsLoaded;
