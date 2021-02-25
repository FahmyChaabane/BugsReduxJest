import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";
import userReducers from "./users";

export default combineReducers({
  bugs: bugsReducer,
  project: projectsReducer,
  users: userReducers,
});
