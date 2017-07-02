import * as React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {debounce} from 'throttle-debounce';
import './SearchBar.css';
import {FaSearch, FaClose} from 'react-icons/lib/fa/index';
import {hideSearchDropdown, showSearchDropdown} from '../../store/reducers/ui';
import {spotifyHandler} from '../../spotify/api';
import {
  decrementOngoingSearches,
  getTracksFromSearchState, incrementOngoingSearches, setArtistResults, setPlaylistResults,
  setTrackResults
} from '../../store/reducers/search';
import tracksNormalizer, {artistNormalizer, playlistsNormalizer} from '../../store/tracksNormalizer';

export interface ArtistSearchResult {
  id: string,
}

export interface PlaylistSearchResult {
  id: string,
}

export interface TrackSearchResult {
  id: string,
}

export interface SearchResults {
  body: {
    artists: {
      items: ArtistSearchResult[]
    },
    playlists: {
      items: PlaylistSearchResult[]
    },
    tracks: {
      items: TrackSearchResult[]
    },
  }
}

class SearchBar extends React.Component {
  state: {
    searchInput: string,
  };

  props: {
    searchResultsTracks: [],
    searchDropdownVisible: boolean,
    hideSearchDropdown(): void,
    showSearchDropdown(): void,
    incrementOngoingSearches(): void,
    decrementOngoingSearches(): void,
    setArtistResults(artists: [], artistResults: []): void,
    setPlaylistResults(playlists: [], playlistResults: []): void,
    setTrackResults(artists: [], tracks: [], trackResults: []): void,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.conductSearch = debounce(300, this.conductSearch.bind(this));
    this.determineWhetherToClose = this.determineWhetherToClose.bind(this);
    this.onSearchInputFocus = this.onSearchInputFocus.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
  }

  clearSearchInput() {
    this.setState({
      searchInput: ''
    });
    this.determineWhetherToClose('');
  }

  conductSearch() {
    const {searchInput} = this.state;
    const {incrementOngoingSearches, decrementOngoingSearches, setArtistResults, setPlaylistResults, setTrackResults} = this.props;
    if (searchInput === '' || searchInput.length < 2) return;
    incrementOngoingSearches();
    spotifyHandler.spotifyApi.search(searchInput, [
      'artist',
      'track',
      'playlist'
    ], {
      limit: 4
    })
      .then((results: SearchResults) => {
        console.log('search results', results);
        const tracksData = tracksNormalizer(results.body.tracks.items);
        const artistsData = artistNormalizer(results.body.artists.items);
        const playlistsData = playlistsNormalizer(results.body.playlists.items);
        setTrackResults(tracksData.entities.artists, tracksData.entities.tracks, tracksData.result);
        setArtistResults(artistsData.entities.artists, artistsData.result);
        setPlaylistResults(playlistsData.entities.playlists, playlistsData.result);
        decrementOngoingSearches();
      }, (error) => {
        console.warn('failed to retrieve search results', error);
        decrementOngoingSearches();
      });
  }

  determineWhetherToClose(searchInput) {
    const {hideSearchDropdown, showSearchDropdown} = this.props;
    if (searchInput !== '') {
      showSearchDropdown();
    } else {
      hideSearchDropdown();
    }
  }

  onSearchInputFocus() {
    const {showSearchDropdown} = this.props;
    const {searchInput} = this.state;
    if (searchInput !== '') {
      showSearchDropdown();
    }
  }

  setSearchInput(event) {
    const searchInput = event.target.value;
    this.setState({
      searchInput
    });
    this.conductSearch();
    this.determineWhetherToClose(searchInput);
  }

  render() {
    const {searchResultsTracks, searchDropdownVisible} = this.props;
    const {searchInput} = this.state;
    console.log('searchResultsTracks', searchResultsTracks);
    return (
      <div className={
        classNames([
          'SearchBar',
          {
            'SearchBar--searchInputExists': (searchInput !== ''),
            'SearchBar--dropdownVisible': searchDropdownVisible
          }
        ])
      }>
        <div className='SearchBar__inputWrapper'>
          <input className='SearchBar__input' type="text"
                 value={searchInput}
                 onFocus={this.onSearchInputFocus}
                 onChange={this.setSearchInput}/>
          <div className='SearchBar__icon'>
            <FaSearch/>
          </div>
          <div className='SearchBar__clear' onClick={this.clearSearchInput}>
            <FaClose/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResultsTracks: getTracksFromSearchState(state.search),
    searchDropdownVisible: state.ui.searchDropdownVisible
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSearchDropdown: () => dispatch(hideSearchDropdown()),
    showSearchDropdown: () => dispatch(showSearchDropdown()),
    incrementOngoingSearches: () => dispatch(incrementOngoingSearches()),
    decrementOngoingSearches: () => dispatch(decrementOngoingSearches()),
    setArtistResults: (artists, artistResults) => dispatch(setArtistResults(artists, artistResults)),
    setPlaylistResults: (playlists, playlistResults) => dispatch(setPlaylistResults(playlists, playlistResults)),
    setTrackResults: (artists, tracks, trackResults) => dispatch(setTrackResults(artists, tracks, trackResults)),
  }
};

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

export default SearchBarContainer;
