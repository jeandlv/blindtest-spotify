import * as constants from './constants';

export const changeScoreWhenLosing = () => ({
	type: constants.CHANGE_SCORE_LOSE
});

export const changeScoreWhenWinning = () => ({
	type: constants.CHANGE_SCORE_SUCCESS
});

export const setNewRound = () => ({
	type: constants.NEW_ROUND
})
