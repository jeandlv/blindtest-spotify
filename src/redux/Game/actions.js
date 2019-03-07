import * as constants from './constants';

export const newGame = loadedTracks => ({
	type: constants.NEW_GAME,
	loadedTracks
});
