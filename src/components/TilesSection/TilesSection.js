import * as React from 'react';
import {connect} from 'react-redux';
import './TilesSection.css';
import Tile from '../Tile/Tile';
import {
  AppState, getSelectedTrackFromState, getTracksFromState, setSelectedTrack,
  TrackData
} from '../../store/reducers/app';
import {TilePlaceholder} from '../TilePlaceholder/TilePlaceholder';

const IMAGES: string[] = [
  'https://i.scdn.co/image/7158eca3b7fb8702a8eba6f7a17cd48017972f72',
  'https://i.scdn.co/image/e7bc4e7e080a714c17508bd530c6b36935fdabad',
  'https://i.scdn.co/image/cf6e792c5f82f6f2bd8d1f155c58368c16c196e8',
  'https://i.scdn.co/image/6904e5f06e49ab5aa5aa214796597228e35e53d4',
  'https://i.scdn.co/image/5cc4872245c11be3b4a455cfdcd8ed61c89088af',
  'https://i.scdn.co/image/dd3e406169db9f67509168e383905d29ea1f7b9b',
  'https://i.scdn.co/image/08855f6f3b24efed3426583e06b33cc7fcf0f28d',
  'https://i.scdn.co/image/7158eca3b7fb8702a8eba6f7a17cd48017972f72',
  'https://i.scdn.co/image/e7bc4e7e080a714c17508bd530c6b36935fdabad',
  'https://i.scdn.co/image/08855f6f3b24efed3426583e06b33cc7fcf0f28d',
  'https://i.scdn.co/image/dd3e406169db9f67509168e383905d29ea1f7b9b',
  'https://i.scdn.co/image/6904e5f06e49ab5aa5aa214796597228e35e53d4',
  'https://i.scdn.co/image/5cc4872245c11be3b4a455cfdcd8ed61c89088af',
  'https://i.scdn.co/image/08855f6f3b24efed3426583e06b33cc7fcf0f28d',
  'https://i.scdn.co/image/e7bc4e7e080a714c17508bd530c6b36935fdabad',
  'https://i.scdn.co/image/cf6e792c5f82f6f2bd8d1f155c58368c16c196e8',
  'https://i.scdn.co/image/7158eca3b7fb8702a8eba6f7a17cd48017972f72',
  'https://i.scdn.co/image/cf6e792c5f82f6f2bd8d1f155c58368c16c196e8',
];


function getImage(index) {
  const image = IMAGES[index % IMAGES.length];
  return image;
}

class TilesSection extends React.Component {
  props: {
    selectedTrack: TrackData,
    tracks: TrackData[],
    setSelectedTrack(trackId: string): void,
  };

  renderTiles() {
    const {selectedTrack, tracks, setSelectedTrack} = this.props;
    const MAX_TILES = 7;
    let rows = [[]];
    tracks.forEach((track, index) => {
      if (rows[rows.length - 1].length >= MAX_TILES) {
        rows.push([]);
      }
      const selected = selectedTrack.id === track.id;
      rows[rows.length - 1].push(
        <Tile track={track}
              key={index}
              image={getImage(index)}
              selected={selected}
              setSelectedTrack={setSelectedTrack}/>
      );
    });
    let lastRow = rows[rows.length - 1];
    if (lastRow.length < MAX_TILES) {
      for (let i = 0, len = (MAX_TILES - lastRow.length); i < len; i++) {
        lastRow.push(
          <TilePlaceholder key={`placeholder-${i}`}/>
        );
      }
    }
    return rows.map((row, index) => {
      return (
        <div className='TilesSection__row' key={index}>
          {row}
        </div>
      );
    });
  }

  renderTilesNoRow() {
    const {selectedTrack, tracks, setSelectedTrack} = this.props;
    return tracks.map((track, index) => {
      const selected = selectedTrack.id === track.id;
      return (
        <Tile track={track}
              key={index}
              image={getImage(index)}
              selected={selected}
              setSelectedTrack={setSelectedTrack}/>
      );
    });
  }

  render() {
    return (
      <div className='TilesSection'>
        <div className='TilesSection__row'>
          {this.renderTilesNoRow()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTrack: getSelectedTrackFromState(state.app),
    tracks: getTracksFromState(state.app),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTrack: (trackId: string) => dispatch(setSelectedTrack(trackId))
  }
};

const TilesSectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TilesSection);

export default TilesSectionContainer;