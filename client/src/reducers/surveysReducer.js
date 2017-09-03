import { FETCH_SURVEYS, SET_CURRENT_SURVEY }  from '../actions/types';

export default function(state = { list: [], current: {} }, action) {
  switch(action.type) {
    case FETCH_SURVEYS:
      return { ...state, list: action.payload };

    case SET_CURRENT_SURVEY:
      return { ...state, current: action.payload };

    default:
      return state;
  }
};
