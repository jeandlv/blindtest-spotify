import { call, put, takeLatest } from 'redux-saga/effects'
import spotifyApi from '../../spotifyApiKey.json';
import * as constants from './constants';

console.log("In file Tracks sagas");

const apiToken = spotifyApi.spotifyApiToken

const fetchTracksApi = () => 
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    });


export function* fetchTracks(dispatch) {
    try {
        console.log('In fetch tracks')
        const result = yield call(fetchTracksApi)
        console.log('result :', result);
        yield put({type : constants.LOAD_TRACKS, result})
    } catch(error) {
        console.log('In fetch tracks error :', error);
        yield put({type: "FETCH_TRACKS_FAILED", error})
    }
}

export function* watchFetchTracks() {
    console.log('In watch fetch tracks')
    yield takeLatest(constants.FETCH_TRACKS, fetchTracks)
}