import React, { Component } from 'react';
import {Provider} from 'react-redux';
import HomeView from './components/HomeView/HomeView';
import {store} from './store/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeView/>
      </Provider>
    );
  }
}

export default App;
