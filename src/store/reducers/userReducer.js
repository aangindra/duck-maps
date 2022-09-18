import { USER } from "../actions/actionTypes";
import { MAPS } from "../../constants";

const initialState = {
  userLocation: {
    ...MAPS.defaultLocation,
  },
  isFetching: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.UPDATE_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
