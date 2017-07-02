import * as React from 'react';
import './AlbumResult.css';
import TrackResult from '../TrackResult/TrackResult';

export default class AlbumResult extends React.Component {
  render() {
    return (
      <div className='AlbumResult'>
        <header className='AlbumResult__header'>
          <h4 className='AlbumResult__header__title'>
            Album Name
          </h4>
        </header>
        <div className='AlbumResult__tracks'>
          <TrackResult/>
          <TrackResult/>
          <TrackResult/>
          <TrackResult/>
          <TrackResult/>
          <TrackResult/>
        </div>
      </div>
    );
  }
}
