import * as React from 'react';
import {connect} from 'react-redux';
import {FaPlay, FaPause} from 'react-icons/lib/fa/index';
import './Player.css';
import {getSelectedTrackFromState, getUpNextTrackFromState, TrackData} from '../../store/reducers/app';
import {pause, play} from '../../store/reducers/ui';

class Player extends React.Component {
  props: {
    selectedTrack: TrackData,
    upNextTrack: TrackData,
    playing: boolean,
    play(): void,
    pause(): void,
  };

  constructor(props) {
    super(props);
    this.togglePlaying = this.togglePlaying.bind(this);
  }

  togglePlaying() {
    const {playing, play, pause} = this.props;
    if (playing) {
      pause();
    } else {
      play();
    }
  }

  render() {
    const {playing, selectedTrack, upNextTrack} = this.props;
    return (
      <div className='Player'>
        <div className='Player__progress'>
          <div className='Player__progress__bar'></div>
        </div>
        <div className='Player__main'>
          <div className='Player__startTime'>0:59</div>
          <div className='Player__controls'>
            <div className='Player__controls__nowPlaying'>
              <span className='Player__controls__nowPlaying__label'>now playing —</span>
              <span>
                {`${selectedTrack.name}, ${selectedTrack.artists.map(artist => {
                  return artist.name
                }).join(', ')}`}
              </span>
            </div>
            <div className='Player__controls__main' onClick={this.togglePlaying}>
              {
                playing ? (
                  <div className='Player__controls__main__pauseIcon'>
                    <FaPause/>
                  </div>
                ) : (
                  <div className='Player__controls__main__playIcon'>
                    <FaPlay/>
                  </div>
                )
              }
            </div>
            <div className='Player__controls__nextUp'>
              <span className='Player__controls__nextUp__label'>next up —</span>
              <span>
                {`${upNextTrack.name}, ${upNextTrack.artists.map(artist => {
                  return artist.name
                }).join(', ')}`}
              </span>
            </div>
          </div>
          <div className='Player__endTime'>3:41</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTrack: getSelectedTrackFromState(state.app),
    upNextTrack: getUpNextTrackFromState(state.app),
    playing: state.ui.playing,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
  }
};

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);

export default PlayerContainer;