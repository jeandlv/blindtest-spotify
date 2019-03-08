import { call, put, takeLatest } from 'redux-saga/effects'
import spotifyApi from './spotifyApiKey.json';

const apiToken = spotifyApi.spotifyApiToken

export function* fetchTracks(dispatch) {
    try {
        console.log('In fetch tracks')
        const result = yield call(fetch, [
            'https://api.spotify.com/v1/me/tracks', 
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + apiToken,
                }
            }
        ])
        yield put({type : "FETCH_TRACKS_SUCCEEDED", result})
        
    } catch(error) {
        yield put({type: "FETCH_TRACKS_FAILED", error})
    }
}

export function* watchFetchTracks() {
    console.log('In watch fetch tracks')
    yield takeLatest('FETCH_REQUESTED', fetchTracks)
}