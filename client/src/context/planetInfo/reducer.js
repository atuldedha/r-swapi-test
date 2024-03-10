import { UPDATE_PLANET_INFO } from "./keys";

export const initialState = {
  planetsInfo: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PLANET_INFO:
      return { ...state, planetsInfo: action.payload };

    default:
      return state;
  }
};

export default reducer;
