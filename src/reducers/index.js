import { combineReducers } from 'redux';
import text from './text';
import tracks from './tracks';
import songsLoaded from './songsLoaded';
import currentTrack from './currentTrack';
import proposedTracks from './proposedTracks';
import round from './round';
import score from './score';

export default combineReducers({
  text,
  tracks,
  songsLoaded,
  currentTrack,
  proposedTracks,
  round,
  score
});
