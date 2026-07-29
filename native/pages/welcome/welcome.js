Page({
  data: {
    nickname: "",
    avatar: "",
    canStart: false,
  },

  onLoad: function () {
    var state = {};
    try {
      state = getApp().getState() || {};
    } catch (e) {}

    if (state.welcomed && state.nickname && state.avatar) {
      getApp().go("/pages/index/index", "reLaunch");
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
    var app = getApp();
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera", "album"],
      camera: "front",
      success: function (res) {
        var file = res.tempFiles && res.tempFiles[0];
        if (!file) return;
        wx.showLoading({ title: "处理中" });
        app
          .compressImageFile(file.tempFilePath)
          .then(function (compressed) {
            return app.saveFilePersistent(compressed);
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
      fail: function () {
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
  },
});
