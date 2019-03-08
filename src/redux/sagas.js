import { watchFetchTracks } from './Tracks/sagas';
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    console.log("In root saga")
    yield all([
      watchFetchTracks
    ])
}