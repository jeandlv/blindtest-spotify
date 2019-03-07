import { connect } from 'react-redux';
import App from './App.component';
import { loadTracks } from '../../redux/Tracks/actions';
import { changeScoreWhenWinning } from '../../redux/Scoring/actions';
import { changeScoreWhenLosing } from '../../redux/Scoring/actions';
import { setNewRound } from '../../redux/Scoring/actions';

const mapStateToProps = state => ({
  tracks: state.tracks,
  progression: state.progression,
})

const mapDispatchToProps = dispatch => ({
  loadTracks: tracks => dispatch(loadTracks(tracks)),
  changeScoreWhenWinning: progression => dispatch(changeScoreWhenWinning()),
  changeScoreWhenLosing: progression => dispatch(changeScoreWhenLosing()),
  setNewRound: progression => dispatch(setNewRound()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
