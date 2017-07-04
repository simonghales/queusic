import {ArtistData, PlaylistData, TrackData} from './app';

export interface AlbumData {
  id: string,
  album_type: string,
  name: string,
  images: [{
    height: number,
    url: string,
    width: number
  }],
  uri: string,
}

export interface FullArtistData {
  albums: AlbumData[],
  topTracks: TrackData[]
}

export interface SearchState {
  artists: [{
    id: string,
    name: string
  }],
  fullArtists: [{
    albums: string[],
    topTracks: string[]
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
  albums: [{
    id: string
  }],
  artistResults: string[],
  playlistResults: string[],
  trackResults: string[],
  ongoingSearches: number,
  selectedSubviewArtist: string,
}

function getInitialState() {
  return {
    artists: {},
    fullArtists: {},
    playlists: {},
    tracks: {},
    albums: {},
    artistResults: [],
    playlistResults: [],
    trackResults: [],
    ongoingSearches: 0,
    selectedSubviewArtist: '',
  }
}

export function getFullArtistFromSearchState(state: SearchState) {
  const {selectedSubviewArtist} = state;
  if (state.fullArtists[selectedSubviewArtist]) {
    const fullArtist = state.fullArtists[selectedSubviewArtist];
    return {
      id: selectedSubviewArtist,
      albums: fullArtist.albums.map((album) => {
        return state.albums[album];
      }),
      topTracks: fullArtist.topTracks.map((track) => {
        return getTrackFromSearchState(state, track);
      })
    }
  } else {
    return null;
  }
}

export function getArtistFromSearchState(state: SearchState) {
  const {selectedSubviewArtist} = state;
  return state.artists[selectedSubviewArtist];
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
export const INCREMENT_ONGOING_SEARCHES = 'INCREMENT_ONGOING_SEARCHES';
export const DECREMENT_ONGOING_SEARCHES = 'DECREMENT_ONGOING_SEARCHES';
export const SET_SELECTED_SUBVIEW_ARTIST = 'SET_SELECTED_SUBVIEW_ARTIST';
export const SET_FULL_ARTISTS = 'SET_FULL_ARTISTS';

export function setFullArtists(albums, tracks, fullArtists) {
  return {
    type: SET_FULL_ARTISTS,
    payload: {
      albums,
      tracks,
      fullArtists
    }
  }
}

export function handleSetFullArtists(state, {albums, tracks, fullArtists}) {
  return {
    ...state,
    albums: {
      ...state.albums,
      ...albums
    },
    tracks: {
      ...state.tracks,
      ...tracks
    },
    fullArtists: {
      ...state.fullArtists,
      ...fullArtists
    },
  };
}

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

export function incrementOngoingSearches() {
  return {
    type: INCREMENT_ONGOING_SEARCHES
  }
}

export function handleIncrementOngoingSearches(state) {
  return {
    ...state,
    ongoingSearches: state.ongoingSearches + 1
  }
}

export function decrementOngoingSearches() {
  return {
    type: DECREMENT_ONGOING_SEARCHES
  }
}

export function handleDecrementOngoingSearches(state) {
  return {
    ...state,
    ongoingSearches: (state.ongoingSearches > 0) ? state.ongoingSearches - 1 : 0
  }
}

export function setSelectedSubviewArtist(artistId: string) {
  return {
    type: SET_SELECTED_SUBVIEW_ARTIST,
    payload: {
      artistId
    }
  }
}

export function handleSetSelectedSubviewArtist(state, {artistId}) {
  return {
    ...state,
    selectedSubviewArtist: artistId,
  }
}

const ACTION_HANDLERS = {
  [SET_TRACK_RESULTS]: handleSetTrackResults,
  [SET_ARTIST_RESULTS]: handleSetArtistResults,
  [SET_PLAYLIST_RESULTS]: handleSetPlaylistResults,
  [INCREMENT_ONGOING_SEARCHES]: handleIncrementOngoingSearches,
  [DECREMENT_ONGOING_SEARCHES]: handleDecrementOngoingSearches,
  [SET_SELECTED_SUBVIEW_ARTIST]: handleSetSelectedSubviewArtist,
  [SET_FULL_ARTISTS]: handleSetFullArtists,
};

export function searchReducer(state: SearchState = getInitialState(), action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}