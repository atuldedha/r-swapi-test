import { UPDATE_PLANET_INFO } from "./keys";

export const updatePlanetInfo = (dispatch) => (planetInfo) => {
  dispatch({
    type: UPDATE_PLANET_INFO,
    payload: { ...planetInfo },
  });
};
