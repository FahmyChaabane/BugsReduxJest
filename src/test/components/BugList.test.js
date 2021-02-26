import React from "react";
import { mount } from "enzyme";
import BugList from "../../components/BugList";
import configureStore from "../../store/configureStore";
import { Provider } from "react-redux";
const store = configureStore();

test("should correctly render BugList", () => {
  const wrapper = mount(
    <Provider store={store}>
      <BugList />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
