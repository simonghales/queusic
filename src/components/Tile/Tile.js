import * as React from 'react';
import classNames from 'classnames';
import * as Vibrant from 'node-vibrant'
import './Tile.css';
import {TrackData} from '../../store/reducers/app';

export default class Tile extends React.Component {
  props: {
    image: string,
    selected?: boolean,
    track: TrackData,
    setSelectedTrack(trackId: string): void,
  };
  state: {
    shadowColor: number[]
  };

  constructor(props) {
    super(props);
    this.state = {
      shadowColor: []
    };
    Vibrant.from(props.image).getPalette((err, palette) => {
      let shadowColor: string = '';
      if (palette['DarkVibrant']) {
        shadowColor = palette['DarkVibrant'].getRgb()
      } else if (palette['DarkMuted']) {
        shadowColor = palette['DarkMuted'].getRgb()
      }
      this.setState({
        shadowColor
      });
    });
  }

  render() {
    const {image, selected, track, setSelectedTrack} = this.props;
    const {shadowColor} = this.state;
    let backgroundStyling = {
      backgroundImage: `url(${image})`,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)'
    };

    if (shadowColor) {
      backgroundStyling['boxShadow'] = `0 3px 21px rgba(${shadowColor[0]}, ${shadowColor[1]}, ${shadowColor[2]}, 0.5), 0 1px 2px rgba(0, 0, 0, 0.08)`;
    }

    return (
      <div className={
        classNames([
          'Tile',
          {
            'Tile--selected': selected
          }
        ])
      } onClick={() => {setSelectedTrack(track.id)}}>
        <div className='Tile__background' style={backgroundStyling}></div>
        <div className='Tile__content'>
          <div className='Tile__info'>
            <div className='Tile__title'>
              <span>{track.name}</span>
            </div>
            <div className='Tile__subtitle'>
              <span>
                {
                  track.artists.map((artist) => {
                    return artist.name;
                  }).join(', ')
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
