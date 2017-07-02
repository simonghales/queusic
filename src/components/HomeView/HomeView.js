import * as React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './HomeView.css';
import TilesSection from '../TilesSection/TilesSection';
import SearchBar from '../SearchBar/SearchBar';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import {hideSearchDropdown, showSearchDropdown} from '../../store/reducers/ui';
import DropdownSubview from '../DropdownSubview/DropdownSubview';

class HomeView extends React.Component {
  props: {
    searchDropdownVisible: boolean,
    hideSearchDropdown(): void,
    showSearchDropdown(): void,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {searchDropdownVisible, hideSearchDropdown} = this.props;
    return (
      <div className='HomeView'>
        <div className='HomeView__search'>
          <SearchBar/>
        </div>
        <main className='HomeView__main'>
          <TilesSection/>
        </main>
        <ReactCSSTransitionGroup
          transitionName='searchDropdownTransition'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}>
          {
            searchDropdownVisible ? (
              <aside className='HomeView__aside'>
                <div className='HomeView__aside__overlay' onClick={hideSearchDropdown}></div>
                <div className='HomeView__aside__content'>
                  <SearchDropdown/>
                  <DropdownSubview/>
                </div>
              </aside>
            ) : null
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchDropdownVisible: state.ui.searchDropdownVisible
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSearchDropdown: () => dispatch(hideSearchDropdown()),
    showSearchDropdown: () => dispatch(showSearchDropdown()),
  }
};

const HomeViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);

export default HomeViewContainer;