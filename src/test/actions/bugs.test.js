import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { startSetBugs } from "../../actions/bugs";
import configureStore from "../../store/configureStore";

let fakeAxios, store;
beforeEach(() => {
  fakeAxios = new MockAdapter(axios);
  store = configureStore();
});

test("blabla first", async () => {
  fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

  await store.dispatch(startSetBugs());
  await store.dispatch(startSetBugs());

  console.log(store.getState());

  expect(fakeAxios.history.get.length).toBe(1);
});
