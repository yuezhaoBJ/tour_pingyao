function loadImageInfo(src) {
  return new Promise(function (resolve) {
    if (!src) {
      resolve(null);
      return;
    }
    wx.getImageInfo({
      src: src,
      success: resolve,
      fail: function () {
        resolve(null);
      },
    });
  });
}

function wrapText(ctx, text, maxWidth) {
  var chars = String(text || "").split("");
  var lines = [];
  var line = "";
  for (var i = 0; i < chars.length; i++) {
    var test = line + chars[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = chars[i];
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function roundRect(ctx, x, y, w, h, r) {
  var radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function loadCanvasImage(canvas, src) {
  return new Promise(function (resolve) {
    if (!src) {
      resolve(null);
      return;
    }
    var img = canvas.createImage();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      resolve(null);
    };
    img.src = src;
  });
}

function drawCheckinWatermark(ctx, opts) {
  var x = opts.x;
  var y = opts.y;
  var w = opts.w;
  var h = opts.h;
  var avatarImg = opts.avatarImg;
  var title = opts.title || "";
  var place = opts.place || "";
  var time = opts.time || "";
  var compact = !!opts.compact;
  if (!title && !place && !time && !avatarImg) return;

  var pad = Math.max(8, Math.round(w * (compact ? 0.028 : 0.022)));
  var avR = Math.max(
    compact ? 14 : 22,
    Math.min(compact ? 26 : 42, Math.round(w * (compact ? 0.075 : 0.055)))
  );
  var fontTitle = Math.max(compact ? 11 : 17, Math.round(w * (compact ? 0.04 : 0.03)));
  var fontPlace = Math.max(compact ? 10 : 15, Math.round(w * (compact ? 0.036 : 0.026)));
  var fontTime = Math.max(compact ? 10 : 14, Math.round(w * (compact ? 0.034 : 0.024)));
  var lineGap = compact ? 3 : 4;
  var placeText = place ? "📍 " + place : "";
  var timeText = time ? "🕒 " + time : "";

  ctx.font = "800 " + fontTitle + "px sans-serif";
  var titleW = title ? ctx.measureText(title).width : 0;
  ctx.font = "700 " + fontPlace + "px sans-serif";
  var placeW = placeText ? ctx.measureText(placeText).width : 0;
  ctx.font = "600 " + fontTime + "px sans-serif";
  var timeW = timeText ? ctx.measureText(timeText).width : 0;
  var textW = Math.max(titleW, placeW, timeW);
  var lineHs = [];
  if (title) lineHs.push(fontTitle);
  if (placeText) lineHs.push(fontPlace);
  if (timeText) lineHs.push(fontTime);
  var textH = 0;
  for (var i = 0; i < lineHs.length; i++) textH += lineHs[i];
  textH += lineGap * Math.max(0, lineHs.length - 1);
  var boxH = Math.max(avR * 2, textH) + pad;
  var boxW = Math.min(w - pad * 2, avR * 2 + 12 + textW + pad * 1.5);
  var boxX = x + pad;
  var boxY = y + pad;

  ctx.fillStyle = "rgba(0,0,0,0.52)";
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1;
  roundRect(ctx, boxX, boxY, boxW, boxH, Math.min(boxH / 2, 16));
  ctx.fill();
  ctx.stroke();

  var ax = boxX + pad * 0.55 + avR;
  var ay = boxY + boxH / 2;
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
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ax, ay, avR, 0, Math.PI * 2);
  ctx.stroke();

  var ty = ay - textH / 2;
  var tx = ax + avR + 8;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  if (title) {
    ctx.fillStyle = "#fff";
    ctx.font = "800 " + fontTitle + "px sans-serif";
    ctx.fillText(title, tx, ty);
    ty += fontTitle + lineGap;
  }
  if (placeText) {
    ctx.fillStyle = "#7ae7ff";
    ctx.font = "700 " + fontPlace + "px sans-serif";
    ctx.fillText(placeText, tx, ty);
    ty += fontPlace + lineGap;
  }
  if (timeText) {
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "600 " + fontTime + "px sans-serif";
    ctx.fillText(timeText, tx, ty);
  }
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
    exporting: false,
    exportStatus: "",
  },

  onShow: function () {
    this.refresh();
  },

  refresh: function () {
    var app = getApp();
    var state = app.getState();
    var loc = app.getLocation();
    var tasks = app.getTasks();
    if (app.doneCount(tasks, state.done) <= 0) {
      wx.showModal({
        title: "还不能生成报告",
        content: "请先至少完成 1 个任务。",
        showCancel: false,
        success: function () {
          wx.navigateBack();
        },
      });
      return;
    }

    var d = new Date();
    var dateText =
      d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
    // 只展示已提交照片的任务：未完成/未拍照的不占位
    var entries = tasks
      .filter(function (t) {
        return !!(state.photos && state.photos[t.id]);
      })
      .map(function (t) {
        var photo = state.photos[t.id] || "";
        var note = state.notes[t.id] || "";
        var story = (loc.reportCopy && loc.reportCopy[t.id]) || t.short;
        return {
          id: t.id,
          icon: t.icon,
          shortTitle: app.shortTitle(t.title),
          place: t.place,
          photo: photo,
          time: app.formatPhotoTime(state.photoTimes && state.photoTimes[t.id]),
          caption: note ? "特工手记：" + note : story,
        };
      });

    if (!entries.length) {
      wx.showModal({
        title: "没有可展示的打卡照片",
        content: "请先完成任务并拍照打卡后，再生成任务报告。",
        showCancel: false,
        success: function () {
          wx.navigateBack();
        },
      });
      return;
    }

    this.setData({
      nickname: state.nickname || "时空小特工",
      avatar: state.avatar,
      role: loc.role,
      locName: loc.name,
      reportLabel: loc.reportLabel,
      rewardTitle: loc.rewardTitle,
      dateText: dateText,
      photoN: app.photoCount(tasks, state.photos),
      entries: entries,
    });
  },

  preview: function (e) {
    var id = Number(e.currentTarget.dataset.id);
    var entry = this.data.entries.find(function (x) {
      return x.id === id;
    });
    if (!entry || !entry.photo) return;
    var urls = this.data.entries
      .filter(function (x) {
        return x.photo;
      })
      .map(function (x) {
        return x.photo;
      });
    wx.previewImage({
      current: entry.photo,
      urls: urls,
    });
  },

  buildWatermarkedTempPath: function (taskId) {
    var app = getApp();
    var state = app.getState();
    var task = app.getTasks().find(function (t) {
      return t.id === taskId;
    });
    var photoPath = state.photos[taskId];
    if (!task || !photoPath) return Promise.resolve(null);

    return loadImageInfo(photoPath).then(function (photoInfo) {
      if (!photoInfo) return null;
      return loadImageInfo(state.avatar).then(function (avatarInfo) {
        var maxSide = 1280;
        var scale = Math.min(1, maxSide / Math.max(photoInfo.width, photoInfo.height));
        var w = Math.round(photoInfo.width * scale);
        var h = Math.round(photoInfo.height * scale);
        var canvas = wx.createOffscreenCanvas({ type: "2d", width: w, height: h });
        var ctx = canvas.getContext("2d");
        return loadCanvasImage(canvas, photoInfo.path || photoPath).then(function (photoImg) {
          if (!photoImg) return null;
          ctx.drawImage(photoImg, 0, 0, w, h);
          return loadCanvasImage(
            canvas,
            avatarInfo ? avatarInfo.path || state.avatar : ""
          ).then(function (avatarImg) {
            drawCheckinWatermark(ctx, {
              x: 0,
              y: 0,
              w: w,
              h: h,
              avatarImg: avatarImg,
              title: task.icon + " " + app.shortTitle(task.title),
              place: task.place || "",
              time: app.formatPhotoTime(state.photoTimes && state.photoTimes[taskId]),
              compact: false,
            });
            return new Promise(function (resolve, reject) {
              wx.canvasToTempFilePath({
                canvas: canvas,
                fileType: "jpg",
                quality: 0.92,
                success: function (res) {
                  resolve(res.tempFilePath);
                },
                fail: reject,
              });
            });
          });
        });
      });
    });
  },

  saveOne: function (e) {
    var that = this;
    var id = Number(e.currentTarget.dataset.id);
    getApp()
      .ensureAlbumAuth()
      .then(function (okAuth) {
        if (!okAuth) return;
        wx.showLoading({ title: "生成水印中" });
        return that
          .buildWatermarkedTempPath(id)
          .catch(function () {
            var entry = that.data.entries.find(function (x) {
              return x.id === id;
            });
            return entry && entry.photo;
          })
          .then(function (path) {
            if (!path) throw new Error("no path");
            return new Promise(function (resolve, reject) {
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: resolve,
                fail: reject,
              });
            });
          })
          .then(function () {
            wx.showToast({ title: "已保存到相册", icon: "success" });
          })
          .catch(function () {
            wx.showToast({ title: "保存失败", icon: "none" });
          })
          .then(function () {
            wx.hideLoading();
          });
      });
  },

  saveAll: function () {
    var that = this;
    var ids = this.data.entries
      .filter(function (x) {
        return x.photo;
      })
      .map(function (x) {
        return x.id;
      });
    if (!ids.length) {
      wx.showToast({ title: "没有可保存的照片", icon: "none" });
      return;
    }
    getApp()
      .ensureAlbumAuth()
      .then(function (okAuth) {
        if (!okAuth) return;
        that.setData({ saving: true });
        var ok = 0;
        var chain = Promise.resolve();
        ids.forEach(function (id, i) {
          chain = chain.then(function () {
            wx.showLoading({ title: "保存 " + (i + 1) + "/" + ids.length });
            return that
              .buildWatermarkedTempPath(id)
              .catch(function () {
                var entry = that.data.entries.find(function (x) {
                  return x.id === id;
                });
                return entry && entry.photo;
              })
              .then(function (path) {
                if (!path) return;
                return new Promise(function (resolve, reject) {
                  wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success: resolve,
                    fail: reject,
                  });
                }).then(function () {
                  ok += 1;
                });
              });
          });
        });
        return chain
          .then(function () {
            wx.showToast({ title: "已保存 " + ok + " 张", icon: "success" });
          })
          .catch(function () {
            wx.showModal({
              title: "批量保存中断",
              content:
                "已成功 " +
                ok +
                " 张。若提示权限问题，请在设置中允许相册权限后重试。",
              showCancel: false,
            });
          })
          .then(function () {
            wx.hideLoading();
            that.setData({ saving: false });
          });
      });
  },

  /** 导出两列瀑布流长图到相册（对齐 H5「生成打卡报告」） */
  exportCollage: function () {
    var that = this;
    if (this.data.exporting) return;
    getApp()
      .ensureAlbumAuth()
      .then(function (okAuth) {
        if (!okAuth) return;
        that.setData({
          exporting: true,
          exportStatus: "正在生成瀑布流长图…",
        });
        wx.showLoading({ title: "生成长图中", mask: true });
        return that
          .buildCollageTempPath()
          .then(function (path) {
            if (!path) throw new Error("build failed");
            return new Promise(function (resolve, reject) {
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: resolve,
                fail: reject,
              });
            });
          })
          .then(function () {
            that.setData({ exportStatus: "长图已保存到相册" });
            wx.showToast({ title: "长图已保存", icon: "success" });
          })
          .catch(function (err) {
            console.error(err);
            that.setData({ exportStatus: "" });
            wx.showModal({
              title: "生成失败",
              content: "瀑布流长图生成失败，请再试一次。也可先用「批量保存全部」。",
              showCancel: false,
            });
          })
          .then(function () {
            wx.hideLoading();
            that.setData({ exporting: false });
            setTimeout(function () {
              that.setData({ exportStatus: "" });
            }, 2800);
          });
      });
  },

  buildCollageTempPath: function () {
    var app = getApp();
    var state = app.getState();
    var loc = app.getLocation();
    var tasks = app.getTasks();
    var photoTasks = tasks.filter(function (t) {
      return !!(state.photos && state.photos[t.id]);
    });
    var name = state.nickname || "时空小特工";
    var dateText = this.data.dateText;
    var photoN = this.data.photoN;
    var ratios = [3 / 4, 4 / 3, 1, 5 / 6, 4 / 5, 3 / 4, 1];

    var W = 750;
    var pad = 24;
    var gap = 12;
    var contentW = W - pad * 2;
    var colW = (contentW - gap) / 2;
    var avatarR = 64;

    // 先用小画布测量文字
    var measureCanvas = wx.createOffscreenCanvas({ type: "2d", width: 8, height: 8 });
    var measure = measureCanvas.getContext("2d");

    var photoInfos = {};
    var chain = Promise.resolve();
    photoTasks.forEach(function (t) {
      if (!state.photos[t.id]) return;
      chain = chain.then(function () {
        return loadImageInfo(state.photos[t.id]).then(function (info) {
          photoInfos[t.id] = info;
        });
      });
    });

    return chain
      .then(function () {
        return loadImageInfo(state.avatar);
      })
      .then(function (avatarInfo) {
        var cards = photoTasks.map(function (t, i) {
          var info = photoInfos[t.id];
          var short = app.shortTitle(t.title);
          var story = (loc.reportCopy && loc.reportCopy[t.id]) || t.short;
          var note = state.notes[t.id] || "";
          var photoTime = app.formatPhotoTime(state.photoTimes && state.photoTimes[t.id]);
          var ratio = ratios[i % ratios.length];
          var photoH = info ? Math.round(colW * ratio) : 100;
          measure.font = "italic 15px sans-serif";
          var bodyText = note ? "特工手记：" + note : story;
          var bodyLines = wrapText(measure, bodyText, colW - 18).slice(0, 2);
          var bodyH = 10 + bodyLines.length * 20 + 10;
          return {
            t: t,
            info: info,
            shortTitle: short,
            note: note,
            bodyLines: bodyLines,
            photoTime: photoTime,
            photoH: photoH,
            cardH: photoH + bodyH,
            i: i,
          };
        });

        var colCards = [[], []];
        var colH = [0, 0];
        cards.forEach(function (card) {
          var side = colH[0] <= colH[1] ? 0 : 1;
          card.side = side;
          var beforeGap = colCards[side].length ? gap : 0;
          card.y = colH[side] + beforeGap;
          colCards[side].push(card);
          colH[side] = card.y + card.cardH;
        });

        var targetH = Math.max(colH[0], colH[1], 0);
        for (var side = 0; side < 2; side++) {
          var delta = targetH - colH[side];
          if (delta <= 0 || !colCards[side].length) continue;
          var stretchable = colCards[side].filter(function (c) {
            return c.info;
          });
          var pool = stretchable.length ? stretchable : colCards[side];
          var base = 0;
          pool.forEach(function (c) {
            base += Math.max(c.photoH, 1);
          });
          var used = 0;
          pool.forEach(function (c, idx) {
            var bodyH = c.cardH - c.photoH;
            var extra =
              idx === pool.length - 1
                ? delta - used
                : Math.round(delta * (c.photoH / base));
            var add = Math.max(0, extra);
            c.photoH += add;
            c.cardH = c.photoH + bodyH;
            used += add;
          });
          var y = 0;
          colCards[side].forEach(function (c, idx) {
            if (idx) y += gap;
            c.y = y;
            y += c.cardH;
          });
          colH[side] = y;
        }

        cards.forEach(function (card) {
          card.x = pad + card.side * (colW + gap);
        });
        var galleryH = Math.max(colH[0], colH[1], 0);
        var heroH = pad + 12 + avatarR * 2 + 22 + 40 + 48 + 24 + 16;
        var footerH = 92;
        var H = Math.ceil(heroH + galleryH + footerH + pad);

        // 真机 canvas 边长限制约 4096，动态降采样
        var pixelScale = 2;
        if (H * pixelScale > 4096) pixelScale = 1;
        if (W * pixelScale > 4096) pixelScale = 1;

        var canvas = wx.createOffscreenCanvas({
          type: "2d",
          width: Math.round(W * pixelScale),
          height: Math.round(H * pixelScale),
        });
        var ctx = canvas.getContext("2d");
        ctx.scale(pixelScale, pixelScale);

        var bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, "#0c1624");
        bg.addColorStop(0.45, "#101a28");
        bg.addColorStop(1, "#0a1018");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = "rgba(61,213,255,0.4)";
        ctx.lineWidth = 2;
        roundRect(ctx, 8, 8, W - 16, H - 16, 16);
        ctx.stroke();

        var avatarSrc = avatarInfo ? avatarInfo.path || state.avatar : "";
        return loadCanvasImage(canvas, avatarSrc).then(function (avatarImg) {
          var imgChain = Promise.resolve();
          var photoImgs = {};
          cards.forEach(function (card) {
            if (!card.info) return;
            imgChain = imgChain.then(function () {
              return loadCanvasImage(
                canvas,
                card.info.path || state.photos[card.t.id]
              ).then(function (img) {
                photoImgs[card.t.id] = img;
              });
            });
          });

          return imgChain.then(function () {
            var cy = pad + 12;
            var cx = W / 2;

            var glow = ctx.createRadialGradient(
              cx,
              cy + avatarR,
              16,
              cx,
              cy + avatarR,
              avatarR + 28
            );
            glow.addColorStop(0, "rgba(240,193,75,0.45)");
            glow.addColorStop(1, "rgba(240,193,75,0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(cx, cy + avatarR, avatarR + 28, 0, Math.PI * 2);
            ctx.fill();

            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy + avatarR, avatarR, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            if (avatarImg) {
              var s = Math.max(
                (avatarR * 2) / avatarImg.width,
                (avatarR * 2) / avatarImg.height
              );
              var dw = avatarImg.width * s;
              var dh = avatarImg.height * s;
              ctx.drawImage(avatarImg, cx - dw / 2, cy + avatarR - dh / 2, dw, dh);
            } else {
              ctx.fillStyle = "#1a2838";
              ctx.fillRect(cx - avatarR, cy, avatarR * 2, avatarR * 2);
            }
            ctx.restore();
            ctx.strokeStyle = "#f0c14b";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(cx, cy + avatarR, avatarR, 0, Math.PI * 2);
            ctx.stroke();

            cy += avatarR * 2 + 22;
            ctx.fillStyle = "#f4f8fc";
            ctx.font = "800 36px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(name, cx, cy);
            cy += 24;

            var chips = [loc.role, loc.name, "📷 " + photoN + " 张"];
            ctx.font = "700 16px sans-serif";
            var chipPads = chips.map(function (c) {
              return { text: c, w: ctx.measureText(c).width + 22 };
            });
            var chipsW = 0;
            chipPads.forEach(function (c) {
              chipsW += c.w;
            });
            chipsW += 8 * (chips.length - 1);
            var chipX = cx - chipsW / 2;
            chipPads.forEach(function (c, i) {
              var isGold = i === 0;
              ctx.fillStyle = isGold
                ? "rgba(240,193,75,0.16)"
                : "rgba(61,213,255,0.12)";
              ctx.strokeStyle = isGold
                ? "rgba(240,193,75,0.5)"
                : "rgba(61,213,255,0.4)";
              ctx.lineWidth = 1.2;
              roundRect(ctx, chipX, cy, c.w, 26, 13);
              ctx.fill();
              ctx.stroke();
              ctx.fillStyle = isGold ? "#f0c14b" : "#7ae7ff";
              ctx.fillText(c.text, chipX + c.w / 2, cy + 18);
              chipX += c.w + 8;
            });
            cy += 48;

            ctx.fillStyle = "rgba(232,238,245,0.65)";
            ctx.font = "400 15px sans-serif";
            ctx.fillText(loc.reportLabel + " · " + dateText, cx, cy);
            ctx.textAlign = "left";
            cy += 20;

            var galleryTop = cy;

            cards.forEach(function (card) {
              var x = card.x;
              var y = galleryTop + card.y;
              var img = photoImgs[card.t.id];
              var photoH = card.photoH;
              var cardH = card.cardH;

              ctx.fillStyle = "rgba(8,14,24,0.75)";
              ctx.strokeStyle = "rgba(61,213,255,0.28)";
              ctx.lineWidth = 1.2;
              roundRect(ctx, x, y, colW, cardH, 12);
              ctx.fill();
              ctx.stroke();

              ctx.save();
              roundRect(ctx, x, y, colW, photoH, 12);
              ctx.clip();
              if (img) {
                var sc = Math.max(colW / img.width, photoH / img.height);
                var idw = img.width * sc;
                var idh = img.height * sc;
                ctx.drawImage(img, x + (colW - idw) / 2, y + (photoH - idh) / 2, idw, idh);
                drawCheckinWatermark(ctx, {
                  x: x,
                  y: y,
                  w: colW,
                  h: photoH,
                  avatarImg: avatarImg,
                  title: card.t.icon + " " + card.shortTitle,
                  place: card.t.place,
                  time: card.photoTime,
                  compact: true,
                });
              } else {
                ctx.fillStyle = "#0a121c";
                ctx.fillRect(x, y, colW, photoH);
                ctx.fillStyle = "rgba(232,238,245,0.55)";
                ctx.font = "400 14px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("📷 暂无照片", x + colW / 2, y + photoH / 2);
                ctx.textAlign = "left";
              }
              ctx.restore();

              // 文字区域底色：让“照片下方说明文字”更清晰
              var captionH = cardH - photoH;
              if (captionH > 0) {
                ctx.fillStyle = "rgba(61, 213, 255, 0.1)";
                ctx.strokeStyle = "rgba(61, 213, 255, 0.24)";
                ctx.lineWidth = 1.1;
                roundRect(ctx, x, y + photoH, colW, captionH, 10);
                ctx.fill();
                ctx.stroke();
              }

              var ty = y + photoH + 16;
              ctx.fillStyle = card.note ? "#f0c14b" : "rgba(232,238,245,0.75)";
              ctx.font = card.note
                ? "italic 14px sans-serif"
                : "400 14px sans-serif";
              card.bodyLines.forEach(function (line) {
                ctx.fillText(line, x + 9, ty);
                ty += 20;
              });
            });

            cy = galleryTop + galleryH + 8;
            ctx.fillStyle = "rgba(240,193,75,0.14)";
            ctx.strokeStyle = "rgba(240,193,75,0.4)";
            roundRect(ctx, pad, cy, contentW, 80, 12);
            ctx.fill();
            ctx.stroke();
            ctx.textAlign = "center";
            ctx.fillStyle = "#f0c14b";
            ctx.font = "800 24px sans-serif";
            ctx.fillText(loc.rewardTitle, cx, cy + 28);
            ctx.fillStyle = "rgba(232,238,245,0.8)";
            ctx.font = "400 14px sans-serif";
            ctx.fillText("以镜头记录旅途，把这份相册讲给爸爸妈妈听吧！", cx, cy + 50);
            ctx.fillText("—— " + loc.name + "时空特工系统", cx, cy + 68);
            ctx.textAlign = "left";

            return new Promise(function (resolve, reject) {
              wx.canvasToTempFilePath({
                canvas: canvas,
                fileType: "jpg",
                quality: 0.9,
                success: function (res) {
                  resolve(res.tempFilePath);
                },
                fail: reject,
              });
            });
          });
        });
      });
  },

  goBack: function () {
    wx.navigateBack();
  },
});
