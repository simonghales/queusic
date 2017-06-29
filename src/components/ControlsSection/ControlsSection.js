import * as React from 'react';
import {FaSearch} from 'react-icons/lib/fa';
import './ControlsSection.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';

export default class ControlsSection extends React.Component {
  render() {
    return (
      <div className='ControlsSection'>
        <div className='ControlsSection__search'>
          <div className='ControlsSection__search__inputWrapper'>
            <input className='ControlsSection__search__input' type="text"/>
            <div className='ControlsSection__search__icon'>
              <FaSearch/>
            </div>
          </div>
          <SearchDropdown/>
        </div>
      </div>
    );
  }
}
