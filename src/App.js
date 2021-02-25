import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startSetBugs } from "./actions/bugs";
import BugList from "./components/BugList";
import "./App.css";

function App(props) {
  useEffect(() => {
    props.startSetBugs();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <span>Learn </span>
        {props.loading ? (
          <div>
            {" "}
            <img src={process.env.PUBLIC_URL + "/images/loader.gif"} />
          </div>
        ) : (
          <BugList />
        )}
      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    startSetBugs: () => dispatch(startSetBugs()),
  };
};

const mapStateToProps = (state, props) => {
  return {
    loading: state.entities.bugs.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
