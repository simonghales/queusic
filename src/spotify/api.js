import SpotifyWebApi from 'spotify-web-api-node';
import Cookies from 'js-cookie';
import {SPOTIFY_CLIENT_ID} from './auth';
import {clearUrlParams, getHashVariable} from '../utils/url';

const all = require('promise-all');

const COOKIE_SPOTIFY_AUTH_TOKEN = 'COOKIE_SPOTIFY_AUTH_TOKEN';

class SpotifyHandler {

  authenticated: boolean = false;
  spotifyApi;

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID
    });
  }

  checkUrlParamsForSpotifyAuthToken() {

    return new Promise((resolve, reject) => {

      const token = getHashVariable('access_token');
      const expiresIn = getHashVariable('expires_in');
      if (token) {
        this.spotifyApi.setAccessToken(token);
        this.authenticated = true;
        Cookies.set(COOKIE_SPOTIFY_AUTH_TOKEN, token, {
          expires: new Date(new Date().getTime() + parseInt(expiresIn) * 1000)
        });
        clearUrlParams();
        resolve();
      } else if (Cookies.get(COOKIE_SPOTIFY_AUTH_TOKEN)) {
        this.spotifyApi.setAccessToken(Cookies.get(COOKIE_SPOTIFY_AUTH_TOKEN));
        this.authenticated = true;
        resolve();
      } else {
        reject();
      }

    });
  }

  getFullArtist(artistId: string) {

    return new Promise((resolve, reject) => {

      const promises = {
        albums: this.spotifyApi.getArtistAlbums(artistId, {
          album_type: 'album',
          limit: 50
        }),
        topTracks: this.spotifyApi.getArtistTopTracks(artistId, 'AU'),
      };

      all(promises)
        .then((values) => {
          resolve({
            albums: values.albums.body,
            topTracks: values.topTracks.body,
          });
        }, (error) => {
          console.warn('failed to get full artist', error);
          reject();
        });

    });

  }

}

export const spotifyHandler = new SpotifyHandler();