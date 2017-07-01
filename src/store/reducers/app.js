import tracksNormalizer from '../tracksNormalizer';
import {TRACKS} from '../../data/tracks';

export interface ArtistData {
  id: string,
  name: string
}

export interface PlaylistData {
  id: string,
  name: string
}

export interface TrackData {
  artists: [ArtistData],
  id: string,
  name: string
}


export interface AppState {
  artists: [{
    id: string,
    name: string
  }],
  tracks: [{
    artists: string[],
    id: string,
    name: string
  }],
  results: string[],
  selectedTrack: string
}

// const initialState = {
//   artists: [],
//   tracks: [],
//   results: []
// };

function getInitialState() {
  const data = tracksNormalizer(TRACKS.items.map((track) => {
    return track.track;
  }));
  return {
    artists: data.entities.artists,
    tracks: data.entities.tracks,
    results: data.result,
    selectedTrack: data.result[0]
  }
}

export function getTracksFromState(state: AppState): TrackData[] {
  return state.results.map((trackId) => {
    return getTrackFromState(state, trackId);
  });
}

export function getTrackFromState(state: AppState, trackId: string): TrackData {
  return {
    ...state.tracks[trackId],
    artists: state.tracks[trackId].artists.map((artistId) => {
      return state.artists[artistId];
    })
  }
}

export function getSelectedTrackFromState(state: AppState): TrackData {
  return getTrackFromState(state, state.selectedTrack);
}

export const SET_SELECTED_TRACK = 'SET_SELECTED_TRACK';

export function setSelectedTrack(trackId: string) {
  return {
    type: SET_SELECTED_TRACK,
    payload: {
      trackId
    }
  }
}

export function handleSetSelectedTrack(state, {trackId}) {
  return {
    ...state,
    selectedTrack: trackId
  }
}

const ACTION_HANDLERS = {
  [SET_SELECTED_TRACK]: handleSetSelectedTrack,
};

export function appReducer(state: AppState = getInitialState(), action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}