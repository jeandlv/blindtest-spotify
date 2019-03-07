import { connect } from 'react-redux';
import App from './App.component';
import { loadTracks } from '../../redux/Tracks/actions';
import { readyToPlay } from '../../redux/Tracks/actions';
import { changeScoreWhenWinning } from '../../redux/Scoring/actions';
import { changeScoreWhenLosing } from '../../redux/Scoring/actions';
import { newGame } from '../../redux/Game/actions';

const mapStateToProps = state => ({
  tracks: state.tracks,
  score: state.score,
  game: state.game
})

const mapDispatchToProps = dispatch => ({
  loadTracks: tracks => dispatch(loadTracks(tracks)),
  readyToPlay: () => dispatch(readyToPlay()),
  changeScoreWhenWinning: () => dispatch(changeScoreWhenWinning()),
  changeScoreWhenLosing: () => dispatch(changeScoreWhenLosing()),
  newGame: loadedTracks => dispatch(newGame(loadedTracks)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
