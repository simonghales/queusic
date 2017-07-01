import * as React from 'react';
import './SearchResultArtist.css';
import {ArtistData} from '../../store/reducers/app';
import SearchResult from '../SearchResult/SearchResult';

export default class SearchResultArtist extends React.Component {
  props: {
    artist: ArtistData
  };

  render() {
    const {artist} = this.props;
    return (
      <SearchResult title={artist.name}/>
    );
  }
}
