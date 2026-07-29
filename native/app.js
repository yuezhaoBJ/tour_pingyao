var loadState, saveState, switchLocation, locations;

try {
  var storage = require("./utils/storage");
  loadState = storage.loadState;
  saveState = storage.saveState;
  switchLocation = storage.switchLocation;
} catch (e) {
  console.error("storage load failed", e);
  loadState = function () {
    return {
      nickname: "",
      avatar: "",
      welcomed: false,
      locationId: "pingyao",
      spots: {},
      done: {},
      notes: {},
      challengeOk: {},
      photos: {},
      photoTimes: {},
      savedAt: null,
    };
  };
  saveState = function () {
    return false;
  };
  switchLocation = function (state, locationId) {
    state.locationId = locationId;
    return state;
  };
}

try {
  locations = require("./data/locations");
} catch (e) {
  console.error("locations load failed", e);
  locations = [];
}

App({
  globalData: {
    state: null,
    locations: locations,
    routing: false,
  },

  onLaunch: function () {
    try {
      this.globalData.state = loadState();
    } catch (e) {
      console.error("onLaunch", e);
      this.globalData.state = loadState();
    }
  },

  /** 防止短时间内重复 reLaunch / redirectTo 触发 routeDone 警告 */
  go: function (url, mode) {
    var that = this;
    if (this.globalData.routing) return;
    this.globalData.routing = true;
    var done = function () {
      setTimeout(function () {
        that.globalData.routing = false;
      }, 400);
    };
    var opts = {
      url: url,
      complete: done,
      fail: function () {
        // redirect 失败时再清栈跳转一次
        if (mode !== "reLaunch") {
          wx.reLaunch({ url: url, complete: done });
        } else {
          done();
        }
      },
    };
    if (mode === "redirect") {
      wx.redirectTo(opts);
    } else {
      wx.reLaunch(opts);
    }
  },

  getState: function () {
    if (!this.globalData.state) {
      this.globalData.state = loadState();
    }
    return this.globalData.state;
  },

  setState: function (patch, opts) {
    var state = this.getState();
    var key;
    patch = patch || {};
    for (key in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, key)) {
        state[key] = patch[key];
      }
    }
    this.globalData.state = state;
    saveState(state, opts);
    return state;
  },

  getLocation: function () {
    var state = this.getState();
    var list = this.globalData.locations || [];
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === state.locationId) return list[i];
    }
    return list[0] || { id: "pingyao", name: "平遥古城", tasks: [], title: "", desc: "", role: "" };
  },

  getTasks: function () {
    var loc = this.getLocation();
    return (loc && loc.tasks) || [];
  },

  switchSpot: function (locationId) {
    var state = this.getState();
    this.globalData.state = switchLocation(
      state,
      locationId,
      this.globalData.locations || []
    );
    return this.globalData.state;
  },
});
