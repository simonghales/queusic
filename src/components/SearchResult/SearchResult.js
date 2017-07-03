import * as React from 'react';
import classNames from 'classnames';
import './SearchResult.css';

export default class SearchResult extends React.Component {
  props: {
    title?: string,
    subtitle?: string,
    placeholder?: boolean,
    image?: string,
    blankImage?: boolean,
    onSelect(): void,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const {onSelect} = this.props;
    if (onSelect) {
      onSelect();
    }
    e.stopPropagation();
  }

  render() {
    const {title, subtitle, image, placeholder, blankImage} = this.props;
    return (
      <div className={classNames([
        'SearchResult',
        {
          'SearchResult--placeholder': placeholder
        }
      ])} onClick={this.onClick}>
        {
          (image || blankImage) ? (
            <div className='SearchResult__image' style={{
              backgroundImage: `url(${image})`
            }}></div>
          ) : null
        }
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
