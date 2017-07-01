import * as React from 'react';
import './SearchResult.css';

export default class SearchResult extends React.Component {
  props: {
    title: string,
    subtitle?: string,
  };

  render() {
    const {title, subtitle} = this.props;
    return (
      <div className='SearchResult'>
        <div className='SearchResult__image'></div>
        <div className='SearchResult__info'>
          <div>
            <div className='SearchResult__info__title'>{title}</div>
            {
              subtitle ? (
                <div className='SearchResult__info__subtitle'>{subtitle}</div>
              ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}
