import createDataContext from "../DataContext";
import reducer, { initialState } from "./reducer";
import { updatePlanetInfo } from "./actions";

export const { Context: PlanetsDataContext, Provider: PlanetsDataProvider } =
  createDataContext(reducer, { updatePlanetInfo }, initialState);
