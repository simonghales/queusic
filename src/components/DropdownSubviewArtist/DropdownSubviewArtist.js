import * as React from 'react';
import './DropdownSubviewArtist.css';
import AlbumResult from '../AlbumResult/AlbumResult';
import TrackResult from '../TrackResult/TrackResult';

export default class DropdownSubviewArtist extends React.Component {
  render() {
    return (
      <div className='DropdownSubviewArtist'>
        <header className='DropdownSubviewArtist__header'>
          <h3 className='DropdownSubviewArtist__header__title'>
            Artist Name
          </h3>
        </header>
        <div className='DropdownSubviewArtist__body'>
          <div className='DropdownSubviewArtist__topTracks'>
            <h4 className='DropdownSubviewArtist__topTracks__title'>Popular</h4>
            <div className='DropdownSubviewArtist__topTracks__list'>
              <TrackResult/>
              <TrackResult/>
              <TrackResult/>
              <TrackResult/>
            </div>
          </div>
          <div className='DropdownSubviewArtist__albums'>
            <h4 className='DropdownSubviewArtist__albums__title'>Albums</h4>
            <div className='DropdownSubviewArtist__albums__list'>
              <AlbumResult/>
              <AlbumResult/>
              <AlbumResult/>
              <AlbumResult/>
              <AlbumResult/>
            </div>
          </div>
          <div className='DropdownSubviewArtist__albums'>
            <h4 className='DropdownSubviewArtist__albums__title'>Singles</h4>
            <div className='DropdownSubviewArtist__albums__list'>
              <AlbumResult/>
              <AlbumResult/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
