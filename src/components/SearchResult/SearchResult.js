import * as React from 'react';
import './SearchResult.css';

export default class SearchResult extends React.Component {
  render() {
    return (
      <div className='SearchResult'>
        <div className='SearchResult__image'></div>
        <div className='SearchResult__info'>
          <div>
            <div className='SearchResult__info__title'>Title</div>
            <div className='SearchResult__info__subtitle'>Subtitle</div>
          </div>
        </div>
      </div>
    );
  }
}
