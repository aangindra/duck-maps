import axios from "axios";
import { PLACE } from "./actionTypes";
import { URLs } from "../../constants";

export const getPlaces = (data) => async (dispatch) => {
  try {
    const result = await axios.get(`${URLs.PLACE_API_URL}/autocomplete/json`, {
      params: data,
    });

    dispatch({
      type: PLACE.GET_PLACE,
      payload: result.data.predictions,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPlaceDetails = (data) => async (dispatch) => {
  try {
    const response = await axios.get(`${URLs.PLACE_API_URL}/details/json`, {
      params: data,
    });
    const result = response.data.result;

    dispatch({
      type: PLACE.UPDATE_SELECTED_LOCATION,
      payload: result,
    });
    dispatch({
      type: PLACE.SAVE_KEYWORD_PLACE,
      payload: {
        keyword: data.keyword,
        _createdAt: new Date().toISOString(),
      },
    });
    dispatch({
      type: PLACE.GET_PLACE,
      payload: [],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
