import * as React from 'react';
import './SearchDropdown.css';
import SearchResult from '../SearchResult/SearchResult';

export default class SearchDropdown extends React.Component {
  render() {
    return (
      <div className='SearchDropdown'>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Tracks</h4>
          <div className='SearchDropdown__section__results'>
            <SearchResult/>
            <SearchResult/>
            <SearchResult/>
            <SearchResult/>
          </div>
        </section>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Artists</h4>
          <div className='SearchDropdown__section__results'>
            <SearchResult/>
            <SearchResult/>
            <SearchResult/>
            <SearchResult/>
          </div>
        </section>
        <section className='SearchDropdown__section'>
          <h4 className='SearchDropdown__section__title'>Playlists</h4>
          <div className='SearchDropdown__section__results'>
            <SearchResult/>
            <SearchResult/>
            <SearchResult/>
            <SearchResult/>
          </div>
        </section>
      </div>
    );
  }
}
