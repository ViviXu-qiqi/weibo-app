import { ADD_COMMENT, GET_COMMENTS, REMOVE_COMMENT, RESET_COMMENTS } from '../constants/actions';
import { uniq } from '../utils';

const initState = {
  comments: [],
};

export default function reducer(state = initState, action) {
  const { comments, params: { page } = {}, total } = action.payload || {};
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: uniq([...state.comments, ...comments]), //之前的comments加上新的
        page,
        total,
      };
    case RESET_COMMENTS:
      return initState;
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(({ id }) => id !== action.payload),
      };
    default:
      return state;
  }
}