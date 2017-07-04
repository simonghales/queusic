import * as React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './HomeView.css';
import TilesSection from '../TilesSection/TilesSection';
import SearchBar from '../SearchBar/SearchBar';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import {
  hideSearchDropdown, hideSearchDropdownSubview, showSearchDropdown,
  showSearchDropdownSubview
} from '../../store/reducers/ui';
import DropdownSubview from '../DropdownSubview/DropdownSubview';
import Player from '../Player/Player';

class HomeView extends React.Component {
  props: {
    searchDropdownVisible: boolean,
    searchDropdownSubviewVisible: boolean,
    hideSearchDropdown(): void,
    showSearchDropdown(): void,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {searchDropdownVisible, searchDropdownSubviewVisible, hideSearchDropdown} = this.props;
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
                  <ReactCSSTransitionGroup
                    transitionName='searchDropdownSubviewTransition'
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}>
                    {
                      searchDropdownSubviewVisible ? (
                        <DropdownSubview/>
                      ) : null
                    }
                  </ReactCSSTransitionGroup>
                </div>
              </aside>
            ) : null
          }
        </ReactCSSTransitionGroup>
        <Player/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchDropdownVisible: state.ui.searchDropdownVisible,
    searchDropdownSubviewVisible: state.ui.searchDropdownSubviewVisible,
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