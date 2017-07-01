import * as React from 'react';
import {connect} from 'react-redux';
import './SearchDropdown.css';
import SearchResult from '../SearchResult/SearchResult';
import {
  getArtistsFromSearchState, getPlaylistsFromSearchState,
  getTracksFromSearchState
} from '../../store/reducers/search';
import {ArtistData, PlaylistData, TrackData} from '../../store/reducers/app';
import SearchResultTrack from '../SearchResultTrack/SearchResultTrack';
import SearchResultArtist from '../SearchResultArtist/SearchResultArtist';
import SearchResultPlaylist from '../SearchResultPlaylist/SearchResultPlaylist';

class SearchDropdown extends React.Component {
  props: {
    searchResultsArtists: ArtistData[],
    searchResultsPlaylists: PlaylistData[],
    searchResultsTracks: TrackData[]
  };

  render() {
    const {searchResultsArtists, searchResultsPlaylists, searchResultsTracks} = this.props;
    return (
      <div className='SearchDropdown'>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Tracks</h4>
          <div className='SearchDropdown__section__results'>
            {searchResultsTracks.map((track, index) => {
              return (
                <SearchResultTrack track={track} key={index}/>
              );
            })}
          </div>
        </section>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Artists</h4>
          <div className='SearchDropdown__section__results'>
            {
              searchResultsArtists.map((artist, index) => {
                return (
                  <SearchResultArtist artist={artist} key={index}/>
                );
              })
            }
          </div>
        </section>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Playlists</h4>
          <div className='SearchDropdown__section__results'>
            {
              searchResultsPlaylists.map((playlist, index) => {
                return (
                  <SearchResultPlaylist playlist={playlist} key={index}/>
                );
              })
            }
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResultsArtists: getArtistsFromSearchState(state.search),
    searchResultsPlaylists: getPlaylistsFromSearchState(state.search),
    searchResultsTracks: getTracksFromSearchState(state.search),
  }
};

const SearchDropdownContainer = connect(
  mapStateToProps,
)(SearchDropdown);

export default SearchDropdownContainer;