import * as constants from './constants';

export const loadTracks = tracks => ({
	type: constants.LOAD_TRACKS,
	tracks
});

export const readyToPlay = () => ({
	type: constants.READY_TO_PLAY
});
