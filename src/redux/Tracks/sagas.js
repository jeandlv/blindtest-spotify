import { call, put, takeLatest } from 'redux-saga/effects'
import spotifyApi from '../../spotifyApiKey.json';
import * as constants from './constants';
import * as game_constants from '../Game/constants';
import { newGame } from '../Game/actions'

const apiToken = spotifyApi.spotifyApiToken

const fetchTracksApi = () =>
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json());


export function* fetchTracks(dispatch) {
    try {
        const result = yield call(fetchTracksApi)
        yield put({type: constants.LOAD_TRACKS, tracks: result.items})
        yield put(newGame(result.items))
        yield put({type: constants.READY_TO_PLAY})
    } catch(error) {
        yield put({type: "FETCH_TRACKS_FAILED", error})
    }
}

export function* watchFetchTracks() {
    yield takeLatest(constants.FETCH_TRACKS, fetchTracks)
}