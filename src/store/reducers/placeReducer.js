import { PLACE } from "../actions/actionTypes";

const initialState = {
  places: [],
  savedKeywords: [],
  isFetching: false,
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE.GET_PLACE:
      return {
        ...state,
        places: action.payload,
      };
    case PLACE.SAVE_KEYWORD_PLACE:
      return {
        ...state,
        savedKeywords: [...state.savedKeywords, action.payload],
      };
    default:
      return state;
  }
};

export default placeReducer;
