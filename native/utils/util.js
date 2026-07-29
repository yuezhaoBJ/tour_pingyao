function escapeText(s) {
  return String(s == null ? "" : s);
}

function shortTitle(title) {
  return String(title || "").replace(/^任务[一二三四五六七八]：/, "");
}

function formatPhotoTime(ts) {
  var n = Number(ts);
  if (!n || !isFinite(n)) return "";
  var d = new Date(n);
  if (isNaN(d.getTime())) return "";
  function pad(v) {
    var s = String(v);
    return s.length < 2 ? "0" + s : s;
  }
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
  var n = 0;
  var i;
  for (i = 0; i < tasks.length; i++) {
    if (doneMap[tasks[i].id]) n++;
  }
  return n;
}

function photoCount(tasks, photos) {
  var n = 0;
  var i;
  for (i = 0; i < tasks.length; i++) {
    if (photos[tasks[i].id]) n++;
  }
  return n;
}

function canComplete(taskId, state) {
  return !!state.challengeOk[taskId] && !!state.photos[taskId] && !state.done[taskId];
}

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

function ensureAlbumAuth() {
  return new Promise(function (resolve) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.writePhotosAlbum"]) {
          resolve(true);
          return;
        }
        wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: function () {
            resolve(true);
          },
          fail: function () {
            wx.showModal({
              title: "需要相册权限",
              content: "请允许保存图片到相册，用于下载打卡照。",
              confirmText: "去设置",
              success: function (r) {
                if (r.confirm) {
                  wx.openSetting({
                    success: function (s) {
                      resolve(!!s.authSetting["scope.writePhotosAlbum"]);
                    },
                    fail: function () {
                      resolve(false);
                    },
                  });
                } else resolve(false);
              },
            });
          },
        });
      },
      fail: function () {
        resolve(false);
      },
    });
  });
}

module.exports = {
  escapeText: escapeText,
  shortTitle: shortTitle,
  formatPhotoTime: formatPhotoTime,
  doneCount: doneCount,
  photoCount: photoCount,
  canComplete: canComplete,
  compressImageFile: compressImageFile,
  saveFilePersistent: saveFilePersistent,
  ensureAlbumAuth: ensureAlbumAuth,
};
