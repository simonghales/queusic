import { createStore } from 'redux';
import {reducer} from './reducers/app';

export const store = createStore(reducer);