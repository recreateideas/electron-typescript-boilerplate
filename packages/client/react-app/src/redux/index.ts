import store from './store';
import { useDispatch } from 'react-redux';
import * as selectors from './selectors';
import * as actions from './actions';
import { useSelector } from './custom-hooks';

export default store;

export { useDispatch, actions, useSelector, selectors };
