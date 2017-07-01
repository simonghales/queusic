import { combineReducers } from 'redux';
import {appReducer} from './app';
import {uiReducer} from './ui';
import {searchReducer} from './search';

export default combineReducers({
  app: appReducer,
  search: searchReducer,
  ui: uiReducer
});