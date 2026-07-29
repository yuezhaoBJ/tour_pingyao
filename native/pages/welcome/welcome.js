function compressImageFile(filePath) {
  return new Promise(function (resolve) {
    if (!wx.compressImage) {
      resolve(filePath);
      return;
    }
    wx.compressImage({
      src: filePath,
      quality: 72,
      success: function (res) {
        resolve(res.tempFilePath || filePath);
      },
      fail: function () {
        resolve(filePath);
      },
    });
  });
}

function saveFilePersistent(tempPath) {
  return new Promise(function (resolve) {
    wx.saveFile({
      tempFilePath: tempPath,
      success: function (res) {
        resolve(res.savedFilePath);
      },
      fail: function () {
        resolve(tempPath);
      },
    });
  });
}

Page({
  data: {
    nickname: "",
    avatar: "",
    canStart: false,
  },

  onLoad: function () {
    var state = {};
    try {
      var app = getApp();
      if (app && typeof app.getState === "function") {
        state = app.getState() || {};
      }
    } catch (e) {
      console.warn("welcome getApp", e);
    }

    // 已报到：只在 onLoad 跳一次，避免与 onShow 重复 reLaunch
    if (state.welcomed && state.nickname && state.avatar) {
      try {
        getApp().go("/pages/index/index", "reLaunch");
      } catch (e) {
        wx.reLaunch({ url: "/pages/index/index" });
      }
      return;
    }

    var nickname = state.nickname || "";
    var avatar = state.avatar || "";
    this.setData({
      nickname: nickname,
      avatar: avatar,
      canStart: !!(String(nickname).replace(/^\s+|\s+$/g, "") && avatar),
    });
  },

  onNick: function (e) {
    var nickname = (e.detail && e.detail.value) || "";
    this.setData({
      nickname: nickname,
      canStart: !!(String(nickname).replace(/^\s+|\s+$/g, "") && this.data.avatar),
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
        if (!file) return;
        wx.showLoading({ title: "处理中" });
        compressImageFile(file.tempFilePath)
          .then(function (compressed) {
            return saveFilePersistent(compressed);
          })
          .then(function (saved) {
            var current = that.data.nickname || nickname || "";
            var keepName = String(current).replace(/^\s+|\s+$/g, "")
              ? current
              : nickname;
            that.setData({
              nickname: keepName,
              avatar: saved,
              canStart: !!(String(keepName).replace(/^\s+|\s+$/g, "") && saved),
            });
          })
          .catch(function () {})
          .then(function () {
            wx.hideLoading();
          });
      },
      fail: function (err) {
        console.warn("chooseMedia", err);
        wx.showToast({ title: "无法打开相机/相册", icon: "none" });
      },
    });
  },

  start: function () {
    var nickname = String(this.data.nickname || "").replace(/^\s+|\s+$/g, "");
    if (!nickname || !this.data.avatar) {
      wx.showToast({ title: "请填写代号并设置照片", icon: "none" });
      return;
    }
    try {
      var app = getApp();
      app.setState(
        {
          nickname: nickname,
          avatar: this.data.avatar,
          welcomed: true,
        },
        { toast: true, message: "报到成功" }
      );
      app.go("/pages/index/index", "reLaunch");
    } catch (e) {
      wx.showToast({ title: "保存失败，请重开项目后再试", icon: "none" });
    }
  },
});
