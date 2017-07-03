import * as React from 'react';
import './SearchResultArtist.css';
import {ArtistData} from '../../store/reducers/app';
import SearchResult from '../SearchResult/SearchResult';

export default class SearchResultArtist extends React.Component {
  props: {
    artist: ArtistData,
    setSelectedSubviewArtist(artistId: string): void,
    showSearchDropdownSubview(): void,
  };

  constructor(props) {
    super(props);
    this.selectArtist = this.selectArtist.bind(this);
  }

  selectArtist() {
    const {artist, setSelectedSubviewArtist, showSearchDropdownSubview} = this.props;
    setSelectedSubviewArtist(artist.id);
    showSearchDropdownSubview();
  }

  render() {
    const {artist} = this.props;
    const image = (artist.images && artist.images.length >= 3) ? artist.images[2].url : '';
    return (
      <SearchResult title={artist.name} image={image} onSelect={this.selectArtist}/>
    );
  }
}
