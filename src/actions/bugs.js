import axios from "axios";
import moment from "moment";
import {
  ADD_BUG,
  RESOLVE_BUG,
  SET_BUGS,
  REQUEST_BUGS_START,
  REQUEST_BUGS_FAIL,
  ASSIGNE_BUG_TO_USER,
} from "../reducers/bugs";

export const startSetBugs = () => (dispatch, getState) => {
  // DON'T FORGET TO TRY REFERENCE // done, WORK!
  const { lastFetch } = getState().entities.bugs;
  const timeDiff = moment().diff(moment(lastFetch), "minutes");
  console.log("test", timeDiff);
  if (timeDiff < 10) return;
  dispatch(REQUEST_BUGS_START());
  console.log("reached here");
  return axios
    .get("http://localhost:9001/api/bugs")
    .then((response) => {
      dispatch(SET_BUGS(response.data));
    })
    .catch(() => {
      dispatch(REQUEST_BUGS_FAIL());
    });
};

export const startAddBug = (bug) => (dispatch, getState) => {
  axios.post("http://localhost:9001/api/bugs", bug).then((response) => {
    // DON'T FORGET THE ARGUMENT INSTEAD OF RESPONSE
    dispatch(ADD_BUG(response.data));
  });
};

export const startResolveBug = (bugId) => (dispatch, getState) => {
  axios
    .patch("http://localhost:9001/api/bugs/" + bugId, {
      resolved: true,
    })
    .then((response) => {
      dispatch(RESOLVE_BUG({ id: response.data.id }));
    });
};

export const startAssignBugToUser = (bugId) => (dispatch, getState) => {
  axios
    .patch("http://localhost:9001/api/bugs/" + bugId, {
      userId: 99,
    })
    .then((response) => {
      dispatch(
        ASSIGNE_BUG_TO_USER({
          bugId: response.data.id,
          userId: response.data.userId,
        })
      );
    });
};
