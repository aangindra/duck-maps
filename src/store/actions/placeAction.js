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
    dispatch({
      type: PLACE.SAVE_KEYWORD_PLACE,
      payload: {
        keyword: data.input,
        _createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
