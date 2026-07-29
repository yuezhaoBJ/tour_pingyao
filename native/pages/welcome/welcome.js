const { compressImageFile, saveFilePersistent } = require("../../utils/util.js");

Page({
  data: {
    nickname: "",
    avatar: "",
    canStart: false,
  },

  onLoad() {
    const app = getApp();
    const state = app.getState();
    if (state.welcomed && state.nickname && state.avatar) {
      wx.reLaunch({ url: "/pages/index/index" });
      return;
    }
    // 只在首次进入时回填，避免拍照返回 onShow 清空正在填写的内容
    const nickname = state.nickname || "";
    const avatar = state.avatar || "";
    this.setData({
      nickname: nickname,
      avatar: avatar,
      canStart: !!(nickname.trim() && avatar),
    });
  },

  onShow() {
    const app = getApp();
    const state = app.getState();
    if (state.welcomed && state.nickname && state.avatar) {
      wx.reLaunch({ url: "/pages/index/index" });
    }
    // 不在这里 setData 表单，防止 chooseMedia 返回后覆盖昵称
  },

  onNick(e) {
    const nickname = e.detail.value || "";
    this.setData({
      nickname: nickname,
      canStart: !!(nickname.trim() && this.data.avatar),
    });
  },

  chooseAvatar() {
    const that = this;
    const nickname = this.data.nickname || "";
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera", "album"],
      camera: "front",
      success: function (res) {
        const file = res.tempFiles && res.tempFiles[0];
        if (!file) return;
        wx.showLoading({ title: "处理中" });
        compressImageFile(file.tempFilePath)
          .then(function (compressed) {
            return saveFilePersistent(compressed);
          })
          .then(function (saved) {
            const current = that.data.nickname || nickname || "";
            const keepName = String(current).trim() ? current : nickname;
            that.setData({
              nickname: keepName,
              avatar: saved,
              canStart: !!(String(keepName).trim() && saved),
            });
          })
          .catch(function () {})
          .then(function () {
            wx.hideLoading();
          });
      },
    });
  },

  start() {
    const nickname = (this.data.nickname || "").trim();
    if (!nickname || !this.data.avatar) {
      wx.showToast({ title: "请填写代号并设置照片", icon: "none" });
      return;
    }
    const app = getApp();
    app.setState(
      {
        nickname: nickname,
        avatar: this.data.avatar,
        welcomed: true,
      },
      { toast: true, message: "报到成功" }
    );
    wx.reLaunch({ url: "/pages/index/index" });
  },
});
