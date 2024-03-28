import { createAction } from "../utils/reducer.utils";
import { SET_CURRENT_USER } from "./types.action";

export const setCurrentUser = (user) => createAction(SET_CURRENT_USER, user);