import * as React from 'react';
import SearchResult from '../SearchResult/SearchResult';
import {TrackData} from '../../store/reducers/app';

export default class SearchResultTrack extends React.Component {
  props: {
    track: TrackData
  };

  render() {
    const {track} = this.props;
    return (
        <SearchResult title={track.name} subtitle={track.artists.map((artist) => {
          return artist.name;
        }).join(', ')}/>
    );
  }
}
