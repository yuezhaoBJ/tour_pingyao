Page({
  data: {
    nickname: "",
    avatar: "",
    roleText: "",
    spots: [],
    locationId: "pingyao",
    locTitle: "",
    locDesc: "",
    cards: [],
    doneN: 0,
    totalN: 0,
    photoN: 0,
    progressPct: 0,
    allDone: false,
  },

  onShow: function () {
    var app = getApp();
    var state = {};
    try {
      state = app.getState() || {};
    } catch (e) {
      console.warn("index onShow", e);
    }

    // 刚从报到页进来：以内存标记为准，避免存盘失败又打回报到页
    if (app.globalData.entryReady) {
      app.globalData.entryReady = false;
      state.welcomed = true;
      state.nickname = state.nickname || (app.globalData.state && app.globalData.state.nickname) || "";
      state.avatar = state.avatar || (app.globalData.state && app.globalData.state.avatar) || "";
      app.globalData.state = state;
    }

    if (!(state.welcomed && state.nickname && state.avatar)) {
      app.globalData._forceWelcome = true;
      wx.redirectTo({ url: "/pages/welcome/welcome" });
      return;
    }

    try {
      this.refresh();
    } catch (e2) {
      console.error("index refresh", e2);
      wx.showModal({
        title: "清单加载失败",
        content: String((e2 && e2.message) || e2 || "未知错误"),
        showCancel: false,
      });
    }
  },

  refresh: function () {
    var app = getApp();
    var state = app.getState();
    var loc = app.getLocation();
    var tasks = app.getTasks();
    var locations = app.globalData.locations || [];
    var doneN = app.doneCount(tasks, state.done);
    var photoN = app.photoCount(tasks, state.photos);
    var totalN = tasks.length;
    var cards = [];
    for (var i = 0; i < tasks.length; i++) {
      var t = tasks[i];
      var hasPhoto = !!state.photos[t.id];
      var done = !!state.done[t.id];
      cards.push({
        id: t.id,
        icon: t.icon,
        shortTitle: app.shortTitle(t.title),
        short: t.short,
        cover: t.cover,
        thumb: hasPhoto ? state.photos[t.id] : t.cover,
        done: done,
        hasPhoto: hasPhoto,
        mission: "MISSION 0" + t.id,
        cls: done ? "task card done" : "task card",
      });
    }
    var spots = [];
    for (var j = 0; j < locations.length; j++) {
      var l = locations[j];
      spots.push({
        id: l.id,
        name: l.name,
        emoji: l.emoji,
        cls: l.id === state.locationId ? "spot on" : "spot",
      });
    }
    this.setData({
      nickname: state.nickname,
      avatar: state.avatar,
      roleText: (loc.role || "") + " · 任务进行中",
      spots: spots,
      locationId: state.locationId,
      locTitle: loc.title,
      locDesc: loc.desc,
      cards: cards,
      doneN: doneN,
      totalN: totalN,
      photoN: photoN,
      progressPct: totalN ? Math.round((doneN / totalN) * 100) : 0,
      allDone: doneN >= totalN && totalN > 0,
      canReport: doneN > 0,
    });
    wx.setNavigationBarTitle({ title: loc.name || "任务清单" });
  },

  onSpot: function (e) {
    var id = e.currentTarget.dataset.id;
    if (!id) return;
    getApp().switchSpot(id);
    this.refresh();
  },

  openTask: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: "/pages/task/task?id=" + id });
  },

  openReport: function () {
    wx.navigateTo({ url: "/pages/report/report" });
  },

  clearCache: function () {
    wx.showModal({
      title: "清空缓存？",
      content: "将删除特工代号、照片、任务进度和打卡照片，并重新进入报到页。",
      confirmText: "清空",
      confirmColor: "#e85d4c",
      success: function (res) {
        if (!res.confirm) return;
        wx.showToast({ title: "已清空", icon: "none", duration: 800 });
        setTimeout(function () {
          getApp().clearAndRestart();
        }, 200);
      },
    });
  },

  changeAvatar: function () {
    var that = this;
    var app = getApp();
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera", "album"],
      camera: "front",
      success: function (res) {
        var file = res.tempFiles && res.tempFiles[0];
        if (!file) return;
        wx.showLoading({ title: "更新中" });
        app
          .compressImageFile(file.tempFilePath)
          .then(function (compressed) {
            return app.saveFilePersistent(compressed);
          })
          .then(function (saved) {
            app.setState({ avatar: saved }, { toast: true, message: "照片已更换" });
            that.refresh();
          })
          .catch(function () {})
          .then(function () {
            wx.hideLoading();
          });
      },
    });
  },

  onShareAppMessage: function () {
    return {
      title: "山西时空特工任务清单",
      path: "/pages/index/index",
    };
  },
});
