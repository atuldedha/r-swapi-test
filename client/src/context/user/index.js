import createDataContext from "../DataContext";
import reducer, { initialState } from "./reducer";
import { updateUser, logoutUser } from "./actions";

export const { Context: UserContext, Provider: UserProvider } =
  createDataContext(
    reducer,
    {
      updateUser,
      logoutUser,
    },
    initialState
  );
