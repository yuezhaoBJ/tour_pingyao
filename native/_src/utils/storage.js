const STORAGE_KEY = "shanxi-agent-mp-v1";

function emptyProgress() {
  return { done: {}, notes: {}, challengeOk: {}, photos: {}, photoTimes: {} };
}

function loadState() {
  try {
    const raw = wx.getStorageSync(STORAGE_KEY);
    if (raw && typeof raw === "object") {
      return normalizeState(raw);
    }
  } catch (_) {}
  return Object.assign(
    {
      nickname: "",
      avatar: "",
      welcomed: false,
      locationId: "pingyao",
      spots: {},
      savedAt: null,
    },
    emptyProgress()
  );
}

function normalizeIdMap(obj) {
  const out = {};
  if (!obj || typeof obj !== "object") return out;
  Object.keys(obj).forEach((k) => {
    const n = Number(k);
    out[isFinite(n) ? n : k] = obj[k];
  });
  return out;
}

function normalizeState(parsed) {
  const locationId = parsed.locationId || "pingyao";
  const spots = parsed.spots || {};
  const progress = spots[locationId] || {
    done: parsed.done,
    notes: parsed.notes,
    challengeOk: parsed.challengeOk,
    photos: parsed.photos,
    photoTimes: parsed.photoTimes,
  };
  return {
    nickname: parsed.nickname || "",
    avatar: parsed.avatar || "",
    welcomed: !!parsed.welcomed,
    locationId,
    spots,
    savedAt: parsed.savedAt || null,
    done: normalizeIdMap(progress.done),
    notes: normalizeIdMap(progress.notes),
    challengeOk: normalizeIdMap(progress.challengeOk),
    photos: normalizeIdMap(progress.photos),
    photoTimes: normalizeIdMap(progress.photoTimes),
  };
}

function snapshotProgress(state) {
  return {
    done: Object.assign({}, state.done || {}),
    notes: Object.assign({}, state.notes || {}),
    challengeOk: Object.assign({}, state.challengeOk || {}),
    photos: Object.assign({}, state.photos || {}),
    photoTimes: Object.assign({}, state.photoTimes || {}),
  };
}

function saveState(state, opts = {}) {
  state.spots = state.spots || {};
  state.spots[state.locationId] = snapshotProgress(state);
  state.savedAt = Date.now();
  const payload = {
    nickname: state.nickname || "",
    avatar: state.avatar || "",
    welcomed: !!state.welcomed,
    locationId: state.locationId || "pingyao",
    spots: state.spots,
    savedAt: state.savedAt,
    version: 1,
  };
  try {
    wx.setStorageSync(STORAGE_KEY, payload);
    if (opts.toast) {
      wx.showToast({ title: opts.message || "已保存", icon: "success", duration: 1500 });
    }
    return true;
  } catch (err) {
    console.error(err);
    // 配额不够时尝试去掉非当前景点照片
    try {
      const slim = JSON.parse(JSON.stringify(payload));
      Object.keys(slim.spots || {}).forEach((id) => {
        if (id !== slim.locationId) {
          slim.spots[id].photos = {};
          slim.spots[id].photoTimes = {};
        }
      });
      wx.setStorageSync(STORAGE_KEY, slim);
      wx.showToast({ title: "空间紧张，已精简旧景点照片", icon: "none" });
      return true;
    } catch (e2) {
      wx.showModal({
        title: "保存失败",
        content: "本地存储已满，请删除部分打卡照后重试。",
        showCancel: false,
      });
      return false;
    }
  }
}

function switchLocation(state, locationId, locations) {
  state.spots = state.spots || {};
  state.spots[state.locationId] = snapshotProgress(state);
  state.locationId = locationId;
  const p = state.spots[locationId] || emptyProgress();
  state.done = normalizeIdMap(p.done);
  state.notes = normalizeIdMap(p.notes);
  state.challengeOk = normalizeIdMap(p.challengeOk);
  state.photos = normalizeIdMap(p.photos);
  state.photoTimes = normalizeIdMap(p.photoTimes);
  saveState(state);
  return state;
}

module.exports = {
  STORAGE_KEY,
  emptyProgress,
  loadState,
  saveState,
  switchLocation,
  snapshotProgress,
};
