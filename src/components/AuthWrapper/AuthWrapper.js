import * as React from 'react';
import {connect} from 'react-redux';
import './AuthWrapper.css';
import {spotifyAuthentication} from '../../spotify/auth';
import {spotifyHandler} from '../../spotify/api';
import {setAuthenticated} from '../../store/reducers/ui';

class AuthWrapper extends React.Component {
  props: {
    authenticated: boolean,
    children?: any,
    setAuthenticated(): void
  };

  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    spotifyHandler.checkUrlParamsForSpotifyAuthToken()
      .then(() => {
        props.setAuthenticated();
      }, () => {});
  }

  authenticate() {
    spotifyAuthentication();
  }

  renderContent() {
    const {children} = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }

  render() {
    const {authenticated} = this.props;
    if (authenticated) return this.renderContent();

    return (
      <div className='AuthWrapper'>
        <div className='AuthWrapper__content'>
          <div className='AuthWrapper__titleWrapper'>
            <h2 className='AuthWrapper__title'>Get Started</h2>
          </div>
          <button className='AuthWrapper__connect' onClick={this.authenticate}>Connect to Spotify</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.ui.authenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated: () => dispatch(setAuthenticated())
  }
};

const AuthWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthWrapper);

export default AuthWrapperContainer;
