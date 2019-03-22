import * as constants from './constants';

export const newGame = (loadedTracks) => {
	return({
		type: constants.NEW_GAME,
		loadedTracks
	})
};
