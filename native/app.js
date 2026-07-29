const { loadState, saveState, switchLocation } = require("./utils/storage.js");
const locations = require("./data/locations.js");

App({
  globalData: {
    state: null,
    locations,
  },

  onLaunch() {
    this.globalData.state = loadState();
  },

  getState() {
    if (!this.globalData.state) {
      this.globalData.state = loadState();
    }
    return this.globalData.state;
  },

  setState(patch, opts) {
    const state = Object.assign(this.getState(), patch || {});
    this.globalData.state = state;
    saveState(state, opts);
    return state;
  },

  getLocation() {
    const state = this.getState();
    return (
      locations.find((l) => l.id === state.locationId) || locations[0]
    );
  },

  getTasks() {
    return this.getLocation().tasks || [];
  },

  switchSpot(locationId) {
    const state = this.getState();
    this.globalData.state = switchLocation(state, locationId, locations);
    return this.globalData.state;
  },
});
