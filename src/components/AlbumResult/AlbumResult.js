import * as React from 'react';
import './AlbumResult.css';
import TrackResult from '../TrackResult/TrackResult';
import {AlbumData} from '../../store/reducers/search';
import {TrackData} from '../../store/reducers/app';
import {spotifyHandler} from '../../spotify/api';

export default class AlbumResult extends React.Component {
  props: {
    album: AlbumData
  };

  state: {
    loading: boolean,
    tracks: TrackData[],
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tracks: [],
    };
    this._loadTracks();
  }

  _loadTracks() {
    const {album} = this.props;
    spotifyHandler.spotifyApi.getAlbumTracks(album.id)
      .then((response) => {
        console.log('loaded album tracks', response, album);
        this.setState({
          loading: false,
          tracks: response.body.items,
        });
      }, (error) => {
        console.warn('failed to load album tracks', error);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const {album} = this.props;
    const {tracks} = this.state;

    return (
      <div className='AlbumResult'>
        <header className='AlbumResult__header'>
          <div className='AlbumResult__header__image' style={{
            backgroundImage: `url(${(album.images.length >= 3) ? album.images[2].url : ''})`
          }}></div>
          <div className='AlbumResult__header__info'>
            {/*<div className='AlbumResult__header__year'>YYYY</div>*/}
            <h4 className='AlbumResult__header__title'>{album.name}</h4>
          </div>
        </header>
        <div className='AlbumResult__tracks'>
          {
            tracks.map((track, index) => {
              return (
                <TrackResult index={index + 1} track={track} key={index}/>
              );
            })
          }
        </div>
      </div>
    );
  }
}
