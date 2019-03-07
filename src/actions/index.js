export const changeSongsLoaded = () => ({
	type: 'LOAD_TRACKS'
});

export const changeText = newText => ({
	type: 'CHANGE_TEXT',
	newText 
});

export const setCurrentTrack = track => ({
	type: 'SELECT_CURRENT_TRACK',
	track
});


export const loadTracks = tracks => ({
	type: 'LOAD_TRACKS',
	tracks
});

export const setProposedTracks = tracks => ({
	type: 'SELECT_PROPOSED_TRACK',
	tracks
});

export const setNewScore = scoreToAdd => ({
	type: 'CHANGE_SCORE',
	scoreToAdd
});

export const changeRound = () => ({
	type: 'NEXT_ROUND',
});


export const Text = {
	COMPONENT_MOUNTED: "Bonjour",
	TRACKS_LOADED : "Your library tracks were well loaded"
};
