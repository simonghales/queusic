import tracksNormalizer from '../tracksNormalizer';
import {TRACKS} from '../../data/tracks';
import {getLength} from '../../utils/time';

export interface ArtistData {
  id: string,
  name: string
}

export interface PlaylistData {
  id: string,
  name: string,
  images: [{
    height: number,
    url: string,
    width: number,
  }],
}

export interface TrackData {
  artists: [ArtistData],
  id: string,
  name: string,
  duration_ms: number,
  track_number: number,
  uri: string,
  images: [{
    height: number,
    url: string,
    width: number,
  }],
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
  selectedTrack: string,
  selectedTrackIndex: number,
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
    selectedTrack: data.result[0],
    selectedTrackIndex: 0,
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

export function getTimeUntilTrackPlaying(state: AppState, index: number) {
  let middleTracks = state.results.slice(state.selectedTrackIndex, index);
  middleTracks = middleTracks.map((track) => {
    return getTrackFromState(state, track);
  });
  const totalDuration = middleTracks.reduce((duration, track) => {
    return duration + track.duration_ms;
  }, 0);
  return getLength(totalDuration);
}

export function getSelectedTrackFromState(state: AppState): TrackData {
  const selectedTrack = state.results[state.selectedTrackIndex];
  return getTrackFromState(state, selectedTrack);
}

export function getUpNextTrackFromState(state: AppState): TrackData {
  const upNextTrackIndex = (state.selectedTrackIndex < (state.results.length - 1)) ? state.selectedTrackIndex + 1 : 0;
  const track = state.results[upNextTrackIndex];
  return getTrackFromState(state, track);
}

export const SET_SELECTED_TRACK = 'SET_SELECTED_TRACK';
export const SET_SELECTED_TRACK_INDEX = 'SET_SELECTED_TRACK_INDEX';
export const ADD_TRACKS_TO_QUEUE = 'ADD_TRACKS_TO_QUEUE';

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

export function setSelectedTrackIndex(index: number) {
  return {
    type: SET_SELECTED_TRACK_INDEX,
    payload: {
      index
    }
  }
}

export function handleSetSelectedTrackIndex(state, {index}) {
  return {
    ...state,
    selectedTrackIndex: index
  }
}

export function addTracksToQueue(tracks: TrackData[]) {
  return {
    type: ADD_TRACKS_TO_QUEUE,
    payload: {
      tracks
    }
  }
}

export function handleAddTracksToQueue(state, {tracks}) {
  const denormalizedTracks = tracksNormalizer(tracks);
  return {
    ...state,
    artists: {
      ...state.artists,
      ...denormalizedTracks.entities.artists
    },
    tracks: {
      ...state.tracks,
      ...denormalizedTracks.entities.tracks
    },
    results: state.results.concat(denormalizedTracks.result),
  }
}

const ACTION_HANDLERS = {
  [SET_SELECTED_TRACK]: handleSetSelectedTrack,
  [SET_SELECTED_TRACK_INDEX]: handleSetSelectedTrackIndex,
  [ADD_TRACKS_TO_QUEUE]: handleAddTracksToQueue,
};

export function appReducer(state: AppState = getInitialState(), action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}