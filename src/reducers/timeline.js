import { GET_HOME_TIMELINE, GET_PUBLIC_TIMELINE, SET_CURRENT_POST } from '../constants/actions';

const initState = {
  home: { posts: [], page: 0 }
};

export default function reducer(state = initState, action) {
  const { statuses, id } = action.payload || {};
  const { page } = action.params || {};
  switch (action.type) {
    case GET_HOME_TIMELINE:
    case GET_PUBLIC_TIMELINE:
      return {
        ...state,
        home: {
          posts: [...state.home.posts, ...statuses], //之前的posts加上新的
          page,
        },
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        current: id, //全局的store里
      };
    default:
      return state;
  }
}