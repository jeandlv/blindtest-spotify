import { connect } from 'react-redux';
import Game from './Game.component';
import { changeScoreWhenWinning } from '../../redux/Scoring/actions';
import { changeScoreWhenLosing } from '../../redux/Scoring/actions';
import { newGame } from '../../redux/Game/actions';

const mapStateToProps = state => ({
  game: state.game
})

const mapDispatchToProps = dispatch => ({
  changeScoreWhenWinning: () => dispatch(changeScoreWhenWinning()),
  changeScoreWhenLosing: () => dispatch(changeScoreWhenLosing()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
