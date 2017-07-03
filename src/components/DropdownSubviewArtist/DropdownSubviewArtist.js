import * as React from 'react';
import {connect} from 'react-redux';
import './DropdownSubviewArtist.css';
import AlbumResult from '../AlbumResult/AlbumResult';
import TrackResult from '../TrackResult/TrackResult';
import {ArtistData} from '../../store/reducers/app';
import {spotifyHandler} from '../../spotify/api';
import {fullArtistsNormalizer} from '../../store/tracksNormalizer';
import {FullArtistData, setFullArtists} from '../../store/reducers/search';

class DropdownSubviewArtist extends React.Component {
  props: {
    artist: ArtistData,
    artistFull: FullArtistData,
    setFullArtists(albums: [], tracks: [], fullArtists: []): void,
  };

  state: {
    loading: boolean
  };

  constructor(props) {
    super(props);
    const {artistFull} = props;
    this.state = {
      loading: (!artistFull)
    };
    this._loadArtistFull(props);
  }

  _loadArtistFull(props) {
    const {artist, artistFull, setFullArtists} = props;
    if (artistFull) {
      return;
    }
    spotifyHandler.getFullArtist(artist.id)
      .then(({albums, topTracks}) => {
        const fullArtists = fullArtistsNormalizer([{
          id: artist.id,
          albums: albums.items,
          topTracks: topTracks.tracks
        }]);
        setFullArtists(fullArtists.entities.albums, fullArtists.entities.tracks, fullArtists.entities.fullArtists);
        this.setState({
          loading: false
        });
      }, (error) => {
        console.warn('failed to load full track', error);
        this.setState({
          loading: false
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.artist.id !== this.props.artist.id) {
      this.setState({
        loading: (nextProps.artistFull)
      });
      this._loadArtistFull(nextProps);
    }
  }

  render() {
    const {artist, artistFull} = this.props;
    return (
      <div className='DropdownSubviewArtist'>
        <header className='DropdownSubviewArtist__header'>
          <h3 className='DropdownSubviewArtist__header__title'>{artist.name}</h3>
        </header>
        <div className='DropdownSubviewArtist__body'>
          <div className='DropdownSubviewArtist__topTracks'>
            <h4 className='DropdownSubviewArtist__topTracks__title'>Popular</h4>
            <div className='DropdownSubviewArtist__topTracks__list'>
              {
                artistFull ? (
                  artistFull.topTracks.map((track, index) => {
                    return (
                      <TrackResult index={index + 1} track={track} key={index}/>
                    );
                  })
                ) : null
              }
            </div>
          </div>
          <div className='DropdownSubviewArtist__albums'>
            <h4 className='DropdownSubviewArtist__albums__title'>Albums</h4>
            <div className='DropdownSubviewArtist__albums__list'>
              {
                artistFull ? (
                  artistFull.albums.map((album, index) => {
                    return (
                      <AlbumResult album={album} key={index}/>
                    );
                  })
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFullArtists: (albums, tracks, fullArtists) => dispatch(setFullArtists(albums, tracks, fullArtists))
  }
};

const DropdownSubviewArtistContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownSubviewArtist);

export default DropdownSubviewArtistContainer;
