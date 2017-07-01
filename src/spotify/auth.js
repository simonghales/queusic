import {getUrlWithQueryParams} from '../utils/url';
export const SPOTIFY_SCOPES: string[] = [
  'user-top-read',
  'playlist-modify-public',
  'playlist-modify-private',
];
export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_CLIENT_ID = '0c00c368674645a4b9d6a3fe2deefdc6';
export const SPOTIFY_AUTH_QUERY_PARAMS = {
  client_id: SPOTIFY_CLIENT_ID,
  response_type: 'token',
  redirect_uri: window.location.href,
  scope: SPOTIFY_SCOPES.join(' ')
};

export function spotifyAuthentication() {
  const url: string = getUrlWithQueryParams(SPOTIFY_AUTH_URL, SPOTIFY_AUTH_QUERY_PARAMS);
  window.location.href = url;
}