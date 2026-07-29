const {
  shortTitle,
  formatPhotoTime,
  doneCount,
  photoCount,
  ensureAlbumAuth,
} = require("../../utils/util");

function loadImageInfo(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    wx.getImageInfo({
      src,
      success: resolve,
      fail: () => resolve(null),
    });
  });
}

Page({
  data: {
    nickname: "",
    avatar: "",
    role: "",
    locName: "",
    reportLabel: "",
    rewardTitle: "",
    dateText: "",
    photoN: 0,
    entries: [],
    saving: false,
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const app = getApp();
    const state = app.getState();
    const loc = app.getLocation();
    const tasks = app.getTasks();
    if (doneCount(tasks, state.done) < tasks.length) {
      wx.showModal({
        title: "还不能生成报告",
        content: "请先完成当前景点的全部任务。",
        showCancel: false,
        success: () => wx.navigateBack(),
      });
      return;
    }

    const d = new Date();
    const dateText = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    const entries = tasks.map((t) => {
      const photo = state.photos[t.id] || "";
      const note = state.notes[t.id] || "";
      const story = (loc.reportCopy && loc.reportCopy[t.id]) || t.short;
      return {
        id: t.id,
        icon: t.icon,
        shortTitle: shortTitle(t.title),
        place: t.place,
        photo,
        time: formatPhotoTime(state.photoTimes && state.photoTimes[t.id]),
        caption: note ? `特工手记：${note}` : story,
      };
    });

    this.setData({
      nickname: state.nickname || "时空小特工",
      avatar: state.avatar,
      role: loc.role,
      locName: loc.name,
      reportLabel: loc.reportLabel,
      rewardTitle: loc.rewardTitle,
      dateText,
      photoN: photoCount(tasks, state.photos),
      entries,
    });
  },

  preview(e) {
    const id = Number(e.currentTarget.dataset.id);
    const entry = this.data.entries.find((x) => x.id === id);
    if (!entry || !entry.photo) return;
    const urls = this.data.entries.filter((x) => x.photo).map((x) => x.photo);
    wx.previewImage({
      current: entry.photo,
      urls,
    });
  },

  async buildWatermarkedTempPath(taskId) {
    const app = getApp();
    const state = app.getState();
    const task = app.getTasks().find((t) => t.id === taskId);
    const photoPath = state.photos[taskId];
    if (!task || !photoPath) return null;

    const photoInfo = await loadImageInfo(photoPath);
    const avatarInfo = await loadImageInfo(state.avatar);
    if (!photoInfo) return null;

    const maxSide = 1280;
    const scale = Math.min(1, maxSide / Math.max(photoInfo.width, photoInfo.height));
    const w = Math.round(photoInfo.width * scale);
    const h = Math.round(photoInfo.height * scale);

    const canvas = wx.createOffscreenCanvas({ type: "2d", width: w, height: h });
    const ctx = canvas.getContext("2d");

    const photoImg = canvas.createImage();
    await new Promise((resolve, reject) => {
      photoImg.onload = resolve;
      photoImg.onerror = reject;
      photoImg.src = photoInfo.path || photoPath;
    });
    ctx.drawImage(photoImg, 0, 0, w, h);

    let avatarImg = null;
    if (avatarInfo) {
      avatarImg = canvas.createImage();
      await new Promise((resolve) => {
        avatarImg.onload = resolve;
        avatarImg.onerror = () => {
          avatarImg = null;
          resolve();
        };
        avatarImg.src = avatarInfo.path || state.avatar;
      });
    }

    const title = `${task.icon} ${shortTitle(task.title)}`;
    const place = task.place || "";
    const time = formatPhotoTime(state.photoTimes && state.photoTimes[taskId]);
    const pad = Math.max(10, Math.round(w * 0.02));
    const avR = Math.max(22, Math.min(42, Math.round(w * 0.055)));
    const fontTitle = Math.max(16, Math.round(w * 0.03));
    const fontPlace = Math.max(14, Math.round(w * 0.026));
    const fontTime = Math.max(13, Math.round(w * 0.024));

    ctx.font = `800 ${fontTitle}px sans-serif`;
    const titleW = ctx.measureText(title).width;
    ctx.font = `700 ${fontPlace}px sans-serif`;
    const placeW = place ? ctx.measureText(`📍 ${place}`).width : 0;
    ctx.font = `600 ${fontTime}px sans-serif`;
    const timeW = time ? ctx.measureText(`🕒 ${time}`).width : 0;
    const textW = Math.max(titleW, placeW, timeW);
    const lineGap = 4;
    const lines = [fontTitle, place ? fontPlace : 0, time ? fontTime : 0].filter(Boolean);
    const textH =
      lines.reduce((a, b) => a + b, 0) + lineGap * Math.max(0, lines.length - 1);
    const boxH = Math.max(avR * 2, textH) + pad;
    const boxW = Math.min(w - pad * 2, avR * 2 + 12 + textW + pad * 1.5);
    const boxX = pad;
    const boxY = pad;

    ctx.fillStyle = "rgba(0,0,0,0.52)";
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1;
    const r = Math.min(boxH / 2, 16);
    ctx.beginPath();
    ctx.moveTo(boxX + r, boxY);
    ctx.arcTo(boxX + boxW, boxY, boxX + boxW, boxY + boxH, r);
    ctx.arcTo(boxX + boxW, boxY + boxH, boxX, boxY + boxH, r);
    ctx.arcTo(boxX, boxY + boxH, boxX, boxY, r);
    ctx.arcTo(boxX, boxY, boxX + boxW, boxY, r);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const ax = boxX + pad * 0.55 + avR;
    const ay = boxY + boxH / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(ax, ay, avR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    if (avatarImg) {
      ctx.drawImage(avatarImg, ax - avR, ay - avR, avR * 2, avR * 2);
    } else {
      ctx.fillStyle = "#1a2838";
      ctx.fillRect(ax - avR, ay - avR, avR * 2, avR * 2);
    }
    ctx.restore();
    ctx.strokeStyle = "#f0c14b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ax, ay, avR, 0, Math.PI * 2);
    ctx.stroke();

    let ty = ay - textH / 2;
    const tx = ax + avR + 10;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#fff";
    ctx.font = `800 ${fontTitle}px sans-serif`;
    ctx.fillText(title, tx, ty);
    ty += fontTitle + lineGap;
    if (place) {
      ctx.fillStyle = "#7ae7ff";
      ctx.font = `700 ${fontPlace}px sans-serif`;
      ctx.fillText(`📍 ${place}`, tx, ty);
      ty += fontPlace + lineGap;
    }
    if (time) {
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = `600 ${fontTime}px sans-serif`;
      ctx.fillText(`🕒 ${time}`, tx, ty);
    }

    const tempPath = await new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        canvas,
        fileType: "jpg",
        quality: 0.92,
        success: (res) => resolve(res.tempFilePath),
        fail: reject,
      });
    });
    return tempPath;
  },

  async saveOne(e) {
    const id = Number(e.currentTarget.dataset.id);
    const okAuth = await ensureAlbumAuth();
    if (!okAuth) return;
    wx.showLoading({ title: "生成水印中" });
    try {
      let path = null;
      try {
        path = await this.buildWatermarkedTempPath(id);
      } catch (err) {
        console.warn("watermark failed, fallback original", err);
        const entry = this.data.entries.find((x) => x.id === id);
        path = entry && entry.photo;
      }
      if (!path) throw new Error("no path");
      await new Promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: resolve,
          fail: reject,
        });
      });
      wx.showToast({ title: "已保存到相册", icon: "success" });
    } catch (err) {
      console.error(err);
      wx.showToast({ title: "保存失败", icon: "none" });
    } finally {
      wx.hideLoading();
    }
  },

  async saveAll() {
    const ids = this.data.entries.filter((x) => x.photo).map((x) => x.id);
    if (!ids.length) {
      wx.showToast({ title: "没有可保存的照片", icon: "none" });
      return;
    }
    const okAuth = await ensureAlbumAuth();
    if (!okAuth) return;

    this.setData({ saving: true });
    let ok = 0;
    try {
      for (let i = 0; i < ids.length; i++) {
        wx.showLoading({ title: `保存 ${i + 1}/${ids.length}` });
        let path = null;
        try {
          path = await this.buildWatermarkedTempPath(ids[i]);
        } catch (_) {
          const entry = this.data.entries.find((x) => x.id === ids[i]);
          path = entry && entry.photo;
        }
        if (!path) continue;
        await new Promise((resolve, reject) => {
          wx.saveImageToPhotosAlbum({
            filePath: path,
            success: resolve,
            fail: reject,
          });
        });
        ok += 1;
      }
      wx.showToast({ title: `已保存 ${ok} 张`, icon: "success" });
    } catch (err) {
      console.error(err);
      wx.showModal({
        title: "批量保存中断",
        content: `已成功 ${ok} 张。若提示权限问题，请在设置中允许相册权限后重试。`,
        showCancel: false,
      });
    } finally {
      wx.hideLoading();
      this.setData({ saving: false });
    }
  },

  goBack() {
    wx.navigateBack();
  },
});
