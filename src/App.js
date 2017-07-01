import React, { Component } from 'react';
import {Provider} from 'react-redux';
import HomeView from './components/HomeView/HomeView';
import {store} from './store/store';
import AuthWrapper from './components/AuthWrapper/AuthWrapper';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AuthWrapper>
          <HomeView/>
        </AuthWrapper>
      </Provider>
    );
  }
}

export default App;
