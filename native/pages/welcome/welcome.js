Page({
  data: {
    nickname: "",
    avatar: "",
  },

  onLoad: function () {
    var app = getApp();
    var state = {};
    try {
      state = app.getState() || {};
    } catch (e) {}

    // 已报到且不是「刚从清单误打回」时，再进清单
    if (state.welcomed && state.nickname && state.avatar && !app.globalData._forceWelcome) {
      wx.redirectTo({ url: "/pages/index/index" });
      return;
    }
    app.globalData._forceWelcome = false;

    this.setData({
      nickname: state.nickname || "",
      avatar: state.avatar || "",
    });
  },

  onNick: function (e) {
    this.setData({
      nickname: (e.detail && e.detail.value) || "",
    });
  },

  chooseAvatar: function () {
    var that = this;
    var nickname = this.data.nickname || "";
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera", "album"],
      camera: "front",
      success: function (res) {
        var file = res.tempFiles && res.tempFiles[0];
        if (!file || !file.tempFilePath) {
          wx.showToast({ title: "未选到图片", icon: "none" });
          return;
        }
        wx.showLoading({ title: "处理中", mask: true });
        var app = getApp();
        var path = file.tempFilePath;
        var run = app.compressImageFile
          ? app.compressImageFile(path)
          : Promise.resolve(path);
        run
          .then(function (compressed) {
            if (app.saveFilePersistent) return app.saveFilePersistent(compressed);
            return compressed;
          })
          .then(function (saved) {
            var keepName = String(that.data.nickname || nickname || "").trim()
              ? that.data.nickname || nickname
              : nickname;
            that.setData({
              nickname: keepName,
              avatar: saved || path,
            });
          })
          .catch(function () {
            that.setData({ avatar: path });
          })
          .then(function () {
            wx.hideLoading();
          });
      },
      fail: function () {
        wx.showToast({ title: "无法打开相机/相册", icon: "none" });
      },
    });
  },

  start: function () {
    var nickname = String(this.data.nickname || "").trim();
    var avatar = this.data.avatar || "";

    if (!nickname) {
      wx.showToast({ title: "请先填写特工代号", icon: "none" });
      return;
    }
    if (!avatar) {
      wx.showToast({ title: "请先拍照设置照片", icon: "none" });
      return;
    }

    var app = getApp();
    // 先写入内存，保证清单页立刻能读到
    app.globalData.state = app.globalData.state || {};
    app.globalData.state.nickname = nickname;
    app.globalData.state.avatar = avatar;
    app.globalData.state.welcomed = true;
    app.globalData.entryReady = true;

    try {
      app.setState(
        { nickname: nickname, avatar: avatar, welcomed: true },
        { toast: false }
      );
    } catch (e) {
      console.warn("setState", e);
    }

    // 先跳转再 toast：showToast 期间 reLaunch 在部分真机会被吞掉
    var goIndex = function () {
      wx.redirectTo({
        url: "/pages/index/index",
        success: function () {
          wx.showToast({ title: "报到成功", icon: "success" });
        },
        fail: function (err) {
          console.warn("redirectTo", err);
          wx.reLaunch({
            url: "/pages/index/index",
            success: function () {
              wx.showToast({ title: "报到成功", icon: "success" });
            },
            fail: function (err2) {
              wx.showModal({
                title: "无法进入任务清单",
                content:
                  (err2 && err2.errMsg) ||
                  (err && err.errMsg) ||
                  "请重新编译后再试",
                showCancel: false,
              });
            },
          });
        },
      });
    };

    goIndex();
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
});
