import { combineReducers } from 'redux';
// import text from './text';
import tracks from './Tracks/reducer';
// import songsLoaded from './songsLoaded';
// import currentTrack from './currentTrack';
// import proposedTracks from './proposedTracks';
// import round from './round';
import score from './Scoring/reducer';
import game from './Game/reducer';

export default combineReducers({
	tracks,
	score,
	game,
});
