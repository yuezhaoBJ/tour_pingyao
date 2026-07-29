const {
  shortTitle,
  doneCount,
  photoCount,
  compressImageFile,
  saveFilePersistent,
} = require("../../utils/util");

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

  onShow() {
    const app = getApp();
    const state = app.getState();
    if (!(state.welcomed && state.nickname && state.avatar)) {
      if (typeof app.go === "function") {
        app.go("/pages/welcome/welcome", "reLaunch");
      } else {
        wx.reLaunch({ url: "/pages/welcome/welcome" });
      }
      return;
    }
    this.refresh();
  },

  refresh() {
    const app = getApp();
    const state = app.getState();
    const loc = app.getLocation();
    const tasks = app.getTasks();
    const locations = app.globalData.locations;
    const doneN = doneCount(tasks, state.done);
    const photoN = photoCount(tasks, state.photos);
    const totalN = tasks.length;
    const cards = tasks.map((t) => {
      const hasPhoto = !!state.photos[t.id];
      const done = !!state.done[t.id];
      return {
        id: t.id,
        icon: t.icon,
        shortTitle: shortTitle(t.title),
        short: t.short,
        cover: t.cover,
        thumb: hasPhoto ? state.photos[t.id] : t.cover,
        done: done,
        hasPhoto: hasPhoto,
        mission: "MISSION 0" + t.id,
        cls: done ? "task card done" : "task card",
      };
    });

    this.setData({
      nickname: state.nickname,
      avatar: state.avatar,
      roleText: (loc.role || "") + " · 任务进行中",
      spots: locations.map((l) => ({
        id: l.id,
        name: l.name,
        emoji: l.emoji,
        cls: l.id === state.locationId ? "spot on" : "spot",
      })),
      locationId: state.locationId,
      locTitle: loc.title,
      locDesc: loc.desc,
      cards: cards,
      doneN: doneN,
      totalN: totalN,
      photoN: photoN,
      progressPct: totalN ? Math.round((doneN / totalN) * 100) : 0,
      allDone: doneN >= totalN && totalN > 0,
    });

    wx.setNavigationBarTitle({ title: loc.name || "任务清单" });
  },

  onSpot(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    getApp().switchSpot(id);
    this.refresh();
  },

  openTask(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/task/task?id=${id}` });
  },

  openReport() {
    wx.navigateTo({ url: "/pages/report/report" });
  },

  changeAvatar() {
    const that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera", "album"],
      camera: "front",
      success: function (res) {
        const file = res.tempFiles && res.tempFiles[0];
        if (!file) return;
        wx.showLoading({ title: "更新中" });
        compressImageFile(file.tempFilePath)
          .then(function (compressed) {
            return saveFilePersistent(compressed);
          })
          .then(function (saved) {
            getApp().setState({ avatar: saved }, { toast: true, message: "照片已更换" });
            that.refresh();
          })
          .catch(function () {})
          .then(function () {
            wx.hideLoading();
          });
      },
    });
  },

  onShareAppMessage() {
    return {
      title: "山西时空特工任务清单",
      path: "/pages/index/index",
    };
  },
});
