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
    return (
      <SearchResult title={playlist.name}/>
    );
  }
}
