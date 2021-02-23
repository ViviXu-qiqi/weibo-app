import { combineReducers } from 'redux';
import comments from './comments';
import timeline from './timeline';

const rootReducer = combineReducers({
  timeline, //timeline是state中的一个属性
  comments, //comments是state中的一个属性
});

export default rootReducer;