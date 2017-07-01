import {ArtistData, PlaylistData, TrackData} from './app';
export interface SearchState {
  artists: [{
    id: string,
    name: string
  }],
  playlists: [{
    id: string,
    name: string,
    owner: string
  }],
  tracks: [{
    artists: string[],
    id: string,
    name: string
  }],
  artistResults: string[],
  playlistResults: string[],
  trackResults: string[],
}

function getInitialState() {
  return {
    artists: {},
    playlists: {},
    tracks: {},
    artistResults: [],
    playlistResults: [],
    trackResults: [],
  }
}

export function getArtistsFromSearchState(state: SearchState): ArtistData[] {
  return state.artistResults.map((artistId) => {
    return state.artists[artistId];
  });
}

export function getPlaylistsFromSearchState(state: SearchState): PlaylistData[] {
  return state.playlistResults.map((playlistId) => {
    return state.playlists[playlistId];
  });
}

export function getTracksFromSearchState(state: SearchState): TrackData[] {
  return state.trackResults.map((trackId) => {
    return getTrackFromSearchState(state, trackId);
  });
}

export function getTrackFromSearchState(state: SearchState, trackId: string): TrackData {
  return {
    ...state.tracks[trackId],
    artists: state.tracks[trackId].artists.map((artistId) => {
      return state.artists[artistId];
    })
  }
}

export const SET_TRACK_RESULTS = 'SET_TRACK_RESULTS';
export const SET_ARTIST_RESULTS = 'SET_ARTIST_RESULTS';
export const SET_PLAYLIST_RESULTS = 'SET_PLAYLIST_RESULTS';

export function setTrackResults(artists, tracks, trackResults) {
  return {
    type: SET_TRACK_RESULTS,
    payload: {
      artists,
      tracks,
      trackResults
    }
  }
}

export function handleSetTrackResults(state, {artists, tracks, trackResults}) {
  return {
    ...state,
    artists: {
      ...state.artists,
      ...artists
    },
    tracks: {
      ...state.tracks,
      ...tracks
    },
    trackResults
  }
}

export function setArtistResults(artists, artistResults) {
  return {
    type: SET_ARTIST_RESULTS,
    payload: {
      artists,
      artistResults
    }
  }
}

export function handleSetArtistResults(state, {artists, artistResults}) {
  return {
    ...state,
    artists: {
      ...state.artists,
      ...artists
    },
    artistResults
  }
}

export function setPlaylistResults(playlists, playlistResults) {
  return {
    type: SET_PLAYLIST_RESULTS,
    payload: {
      playlists,
      playlistResults
    }
  }
}

export function handleSetPlaylistResults(state, {playlists, playlistResults}) {
  return {
    ...state,
    playlists: {
      ...state.playlists,
      ...playlists
    },
    playlistResults
  }
}

const ACTION_HANDLERS = {
  [SET_TRACK_RESULTS]: handleSetTrackResults,
  [SET_ARTIST_RESULTS]: handleSetArtistResults,
  [SET_PLAYLIST_RESULTS]: handleSetPlaylistResults,
};

export function searchReducer(state: SearchState = getInitialState(), action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}