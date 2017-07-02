import * as React from 'react';
import SearchResult from '../SearchResult/SearchResult';
import {TrackData} from '../../store/reducers/app';

export default class SearchResultTrack extends React.Component {
  props: {
    track: TrackData,
    addTracksToQueue(tracks: TrackData[]): void,
    hideSearchDropdown(): void,
  };

  constructor(props) {
    super(props);
    this.selectTrack = this.selectTrack.bind(this);
  }

  selectTrack() {
    const {addTracksToQueue, track, hideSearchDropdown} = this.props;
    addTracksToQueue([track]);
    hideSearchDropdown();
  }

  render() {
    const {track} = this.props;
    return (
        <SearchResult title={track.name} subtitle={track.artists.map((artist) => {
          return artist.name;
        }).join(', ')} onSelect={this.selectTrack}/>
    );
  }
}
