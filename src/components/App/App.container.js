import { connect } from 'react-redux';
import App from './App.component';
import { loadTracks } from '../../redux/Tracks/actions';
import { readyToPlay } from '../../redux/Tracks/actions';
import { loadTracksSaga } from '../../redux/Tracks/actions';
import { changeScoreWhenWinning } from '../../redux/Scoring/actions';
import { changeScoreWhenLosing } from '../../redux/Scoring/actions';
import { newGame } from '../../redux/Game/actions';

const mapStateToProps = state => ({
  tracks: state.tracks,
  score: state.score,
  game: state.game,
})

const mapDispatchToProps = dispatch => ({
  readyToPlay: () => dispatch(readyToPlay()),
  loadTracksSaga : () => dispatch(loadTracksSaga()),
  newGame: loadedTracks => dispatch(newGame(loadedTracks)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
