import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startResolveBug, startAssignBugToUser } from "../actions/bugs";
import { getUnresolvedBugSelector } from "../selectors/bugs";

export const BugList = () => {
  const dispatch = useDispatch();
  const bugs = useSelector(getUnresolvedBugSelector);
  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>
          {bug.id}
          {bug.name}
          <button onClick={() => dispatch(startResolveBug(bug.id))}>
            resolve
          </button>
          <button onClick={() => dispatch(startAssignBugToUser(bug.id))}>
            assign to user
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BugList;
