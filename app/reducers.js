import { combineReducers } from 'redux'

import common from './common/reducers';
import repos from './repos/reducers';

export default combineReducers({
    //More reducers here
    common,
    repos,
})