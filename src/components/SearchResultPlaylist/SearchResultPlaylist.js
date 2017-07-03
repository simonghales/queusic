import * as React from 'react';
import './SearchResultPlaylist.css';
import {PlaylistData} from '../../store/reducers/app';
import SearchResult from '../SearchResult/SearchResult';

export default class SearchResultPlaylist extends React.Component {
  props: {
    playlist: PlaylistData
  };

  render() {
    const {playlist} = this.props;
    const image = (playlist.images && playlist.images.length >= 3) ? playlist.images[2].url : '';
    return (
      <SearchResult title={playlist.name} image={image} blankImage={true}/>
    );
  }
}
