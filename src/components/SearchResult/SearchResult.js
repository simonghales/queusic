import * as React from 'react';
import classNames from 'classnames';
import './SearchResult.css';

export default class SearchResult extends React.Component {
  props: {
    title?: string,
    subtitle?: string,
    placeholder?: boolean,
    onSelect(): void,
  };

  render() {
    const {title, subtitle, placeholder, onSelect} = this.props;
    return (
      <div className={classNames([
        'SearchResult',
        {
          'SearchResult--placeholder': placeholder
        }
      ])} onClick={() => {
        return (onSelect) ? onSelect() : null
      }}>
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
