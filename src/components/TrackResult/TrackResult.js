import * as React from 'react';
import './TrackResult.css';
import {TrackData} from '../../store/reducers/app';
import {getDuration} from '../../utils/duration';

export default class TrackResult extends React.Component {
  props: {
    index: number,
    track: TrackData,
    addTracksToQueue(tracks: TrackData[]): void,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {track, addTracksToQueue} = this.props;
    addTracksToQueue([track]);
  }

  render() {
    const {index, track} = this.props;

    return (
      <div className='TrackResult' onClick={this.onClick}>
        <div className='TrackResult__info'>
          <div className='TrackResult__trackNumber'>{index}</div>
          <div className='TrackResult__name'>{track.name}</div>
          <div className='TrackResult__duration'>{getDuration(track.duration_ms)}</div>
        </div>
      </div>
    );
  }
}

