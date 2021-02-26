import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { startAddBug, startResolveBug, startSetBugs } from "../../actions/bugs";
import {
  getBugsSelector,
  getUnresolvedBugSelector,
} from "../../selectors/bugs";
import configureStore from "../../store/configureStore";

let fakeAxios, store;
beforeEach(() => {
  fakeAxios = new MockAdapter(axios);
  store = configureStore();
});

const createState = () => ({
  entities: {
    bugs: {
      list: [],
    },
  },
});

test("loading bugs should not be fetched from the server again.", async () => {
  fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

  await store.dispatch(startSetBugs());
  await store.dispatch(startSetBugs());

  expect(fakeAxios.history.get.length).toBe(1);
});

test("loading bugs should be fetched from the server and put in the store.", async () => {
  fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

  await store.dispatch(startSetBugs());

  expect(store.getState().entities.bugs.list).toHaveLength(1);
});

test("loading indicator should be true while fetching the bugs", () => {
  fakeAxios.onGet("/bugs").reply(() => {
    expect(store.getState().entities.bugs.loading).toBe(true);
    return [200, [{ id: 1 }]];
  });

  store.dispatch(startSetBugs());
});

test("loading indicator should be false after the bugs are fetched", async () => {
  fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

  await store.dispatch(startSetBugs());

  expect(store.getState().entities.bugs.loading).toBe(false);
});

test("loading indicator should be false after the bugs are fetched", async () => {
  fakeAxios.onGet("/bugs").reply(500);

  await store.dispatch(startSetBugs());

  expect(store.getState().entities.bugs.loading).toBe(false);
});

test("should mark the bug as resolved if it's saved to the server.", async () => {
  // AAA
  fakeAxios.onPost("/bugs").reply(200, { id: 1 });
  fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });

  await store.dispatch(startAddBug({}));
  await store.dispatch(startResolveBug(1));

  expect(store.getState().entities.bugs.list[0].resolved).toBe(true);
});

test("should not mark the bug as resolved if it's not saved to the server.", async () => {
  // AAA
  fakeAxios.onPost("/bugs").reply(200, { id: 1 });
  fakeAxios.onPatch("/bugs/1").reply(500);

  await store.dispatch(startAddBug({}));
  await store.dispatch(startResolveBug(1));

  expect(store.getState().entities.bugs.list[0].resolved).not.toBe(true);
});

test("should add the bug to the store if it's saved to the server", async () => {
  const bug = { description: "a" };
  const savedBug = { ...bug, id: 1 };
  fakeAxios.onPost("/bugs").reply(200, savedBug);

  await store.dispatch(startAddBug(bug));

  expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
});

test("should not add the bug to the store if it's not saved to the server", async () => {
  const bug = { description: "a" };
  fakeAxios.onPost("/bugs").reply(500);

  await store.dispatch(startAddBug(bug));

  expect(store.getState().entities.bugs.list).toHaveLength(0);
});

test("getBugsList", () => {
  const state = createState();
  state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }];
  let result;

  result = getUnresolvedBugSelector(state);
  expect(result).toHaveLength(2);

  result = getBugsSelector(state);
  expect(result).toHaveLength(3);
});
