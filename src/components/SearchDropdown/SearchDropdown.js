import * as React from 'react';
import {connect} from 'react-redux';
import './SearchDropdown.css';
import classNames from 'classnames';
import {
  getArtistsFromSearchState, getPlaylistsFromSearchState,
  getTracksFromSearchState
} from '../../store/reducers/search';
import {addTracksToQueue, ArtistData, PlaylistData, TrackData} from '../../store/reducers/app';
import SearchResultTrack from '../SearchResultTrack/SearchResultTrack';
import SearchResultArtist from '../SearchResultArtist/SearchResultArtist';
import SearchResultPlaylist from '../SearchResultPlaylist/SearchResultPlaylist';
import SearchResult from '../SearchResult/SearchResult';
import {hideSearchDropdown} from '../../store/reducers/ui';

class SearchDropdown extends React.Component {
  props: {
    ongoingSearches: number,
    searchResultsArtists: ArtistData[],
    searchResultsPlaylists: PlaylistData[],
    searchResultsTracks: TrackData[],
    addTracksToQueue(tracks: TrackData[]): void,
    hideSearchDropdown(): void,
  };

  render() {
    const {ongoingSearches,
      searchResultsArtists,
      searchResultsPlaylists,
      searchResultsTracks,
      addTracksToQueue,
      hideSearchDropdown} = this.props;
    return (
      <div className={classNames([
        'SearchDropdown',
        {
          'SearchDropdown--ongoingSearches': (ongoingSearches > 0)
        }
      ])}>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Tracks</h4>
          <div className='SearchDropdown__section__results'>
            {
              (ongoingSearches === 0) ? (
                searchResultsTracks.map((track, index) => {
                  return (
                    <SearchResultTrack addTracksToQueue={addTracksToQueue}
                                       hideSearchDropdown={hideSearchDropdown}
                                       track={track} key={index}/>
                  );
                })
              ) : (
                Array.from({length: 4}).map((track, index) => {
                  return (
                    <SearchResult placeholder={true} key={index}/>
                  );
                })
              )
            }
            {
              (ongoingSearches === 0 && searchResultsTracks.length === 0) ? (
                this.renderEmptyMessage()
              ) : null
            }
          </div>
        </section>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Artists</h4>
          <div className='SearchDropdown__section__results'>
            {
              (ongoingSearches === 0) ? (
                searchResultsArtists.map((artist, index) => {
                  return (
                    <SearchResultArtist artist={artist} key={index}/>
                  );
                })
              ) : (
                Array.from({length: 4}).map((track, index) => {
                  return (
                    <SearchResult placeholder={true} key={index}/>
                  );
                })
              )
            }
            {
              (ongoingSearches === 0 && searchResultsArtists.length === 0) ? (
                this.renderEmptyMessage()
              ) : null
            }
          </div>
        </section>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Playlists</h4>
          <div className='SearchDropdown__section__results'>
            {
              (ongoingSearches === 0) ? (
                searchResultsPlaylists.map((playlist, index) => {
                  return (
                    <SearchResultPlaylist playlist={playlist} key={index}/>
                  );
                })
              ) : (
                Array.from({length: 4}).map((track, index) => {
                  return (
                    <SearchResult placeholder={true} key={index}/>
                  );
                })
              )
            }

            {
              (ongoingSearches === 0 && searchResultsPlaylists.length === 0) ? (
                this.renderEmptyMessage()
              ) : null
            }
          </div>
        </section>
      </div>
    );
  }

  renderEmptyMessage() {
    return (
      <div className='SearchDropdown__section__results__emptyMessage'>
        No results
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    ongoingSearches: state.search.ongoingSearches,
    searchResultsArtists: getArtistsFromSearchState(state.search),
    searchResultsPlaylists: getPlaylistsFromSearchState(state.search),
    searchResultsTracks: getTracksFromSearchState(state.search),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTracksToQueue: (tracks: TrackData[]) => dispatch(addTracksToQueue(tracks)),
    hideSearchDropdown: () => dispatch(hideSearchDropdown()),
  }
};

const SearchDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchDropdown);

export default SearchDropdownContainer;