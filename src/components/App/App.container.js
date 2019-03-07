import { connect } from 'react-redux';
import App from './App.component';
import { loadTracks } from '../../actions';

const mapStateToProps = state => ({
  tracks: state.tracks
})

const mapDispatchToProps = dispatch => ({
  loadTracks: tracks => dispatch(loadTracks(tracks))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
