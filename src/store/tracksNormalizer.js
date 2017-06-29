import {schema, normalize} from 'normalizr';

const artist = new schema.Entity('artists');
const track = new schema.Entity('tracks', {
  artists: [artist]
});
const tracksList = [track];

const tracksNormalizer = tracksResult => normalize(tracksResult, tracksList);

export default tracksNormalizer;