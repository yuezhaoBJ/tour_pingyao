function escapeText(s) {
  return String(s == null ? "" : s);
}

function shortTitle(title) {
  return String(title || "").replace(/^任务[一二三四五六七八]：/, "");
}

function formatPhotoTime(ts) {
  const n = Number(ts);
  if (!n || !isFinite(n)) return "";
  const d = new Date(n);
  if (isNaN(d.getTime())) return "";
  const pad = function (v) {
    const s = String(v);
    return s.length < 2 ? "0" + s : s;
  };
  return (
    d.getFullYear() +
    "年" +
    (d.getMonth() + 1) +
    "月" +
    d.getDate() +
    "日 " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes())
  );
}

function doneCount(tasks, doneMap) {
  return tasks.filter((t) => doneMap[t.id]).length;
}

function photoCount(tasks, photos) {
  return tasks.filter((t) => photos[t.id]).length;
}

function canComplete(taskId, state) {
  return !!state.challengeOk[taskId] && !!state.photos[taskId] && !state.done[taskId];
}

/** 压缩本地图片为较小临时文件，返回临时路径 */
function compressImageFile(filePath) {
  return new Promise((resolve, reject) => {
    wx.compressImage({
      src: filePath,
      quality: 72,
      success: (res) => resolve(res.tempFilePath || filePath),
      fail: () => resolve(filePath),
    });
  });
}

/** 把临时文件转存到用户目录，避免被清理 */
function saveFilePersistent(tempPath) {
  return new Promise((resolve, reject) => {
    wx.saveFile({
      tempFilePath: tempPath,
      success: (res) => resolve(res.savedFilePath),
      fail: (err) => {
        // 失败则仍用临时路径
        console.warn("saveFile failed", err);
        resolve(tempPath);
      },
    });
  });
}

function ensureAlbumAuth() {
  return new Promise((resolve) => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.writePhotosAlbum"]) {
          resolve(true);
          return;
        }
        wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: () => resolve(true),
          fail: () => {
            wx.showModal({
              title: "需要相册权限",
              content: "请允许保存图片到相册，用于下载打卡照。",
              confirmText: "去设置",
              success: (r) => {
                if (r.confirm) {
                  wx.openSetting({
                    success: (s) => resolve(!!s.authSetting["scope.writePhotosAlbum"]),
                    fail: () => resolve(false),
                  });
                } else resolve(false);
              },
            });
          },
        });
      },
      fail: () => resolve(false),
    });
  });
}

module.exports = {
  escapeText,
  shortTitle,
  formatPhotoTime,
  doneCount,
  photoCount,
  canComplete,
  compressImageFile,
  saveFilePersistent,
  ensureAlbumAuth,
};
