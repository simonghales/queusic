import * as React from 'react';
import './DropdownSubview.css';
import DropdownSubviewArtist from '../DropdownSubviewArtist/DropdownSubviewArtist';

export default class DropdownSubview extends React.Component {
  render() {
    return (
      <div className='DropdownSubview'>
        <DropdownSubviewArtist/>
      </div>
    );
  }
}
