import {schema, normalize} from 'normalizr';

const user = new schema.Entity('users');
const artist = new schema.Entity('artists');
const track = new schema.Entity('tracks', {
  artists: [artist]
});
const playlist = new schema.Entity('playlists', {
  owner: user
});
const album = new schema.Entity('albums');
const fullArtist = new schema.Entity('fullArtists', {
  albums: [album],
  topTracks: [track]
});
const fullArtistsList = [fullArtist];
const artistsList = [artist];
const tracksList = [track];
const playlistsList = [playlist];

export const artistNormalizer = artistsResult => normalize(artistsResult, artistsList);
export const fullArtistsNormalizer = fullArtistsResult => normalize(fullArtistsResult, fullArtistsList);
const tracksNormalizer = tracksResult => normalize(tracksResult, tracksList);
export const playlistsNormalizer = playlistsResult => normalize(playlistsResult, playlistsList);

export default tracksNormalizer;