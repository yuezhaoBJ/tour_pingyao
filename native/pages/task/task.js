const {
  shortTitle,
  canComplete,
  compressImageFile,
  saveFilePersistent,
} = require("../../utils/util.js");

Page({
  data: {
    taskId: 0,
    task: null,
    shortTitle: "",
    warmed: false,
    challenged: false,
    done: false,
    photo: "",
    canFinish: false,

    warmupType: "skip",
    warmupTitle: "热身准备",
    warmupHint: "",
    warmupChoices: [],
    warmupPlaceholder: "",
    warmMin: 6,
    warmText: "",
    warmFeedback: "",
    warmOk: false,
    warmFbCls: "fb",

    quizzes: [],
    quizIdx: 0,
    currentQuiz: { q: "", options: [] },
    quizFeedback: "",
    quizOk: false,
    quizFbCls: "fb",

    photoTitle: "打卡照",
    photoHint: "",
    challengeText: "",
  },

  onLoad(query) {
    const id = Number(query.id);
    this.setData({ taskId: id });
    this.loadTask(id);
  },

  onShow() {
    if (this.data.taskId) this.loadTask(this.data.taskId);
  },

  loadTask(id) {
    const app = getApp();
    const state = app.getState();
    const task = app.getTasks().find((t) => t.id === id);
    if (!task) {
      wx.showToast({ title: "任务不存在", icon: "none" });
      setTimeout(() => wx.navigateBack(), 500);
      return;
    }

    const challenged = !!state.challengeOk[id];
    const done = !!state.done[id];
    const photo = state.photos[id] || "";
    // 已完成问答则热身也视为完成
    const warmed = challenged || done || !!this._sessionWarmed;

    let warmupType = "skip";
    let warmupTitle = "热身准备";
    let warmupHint = "";
    let warmupChoices = [];
    let warmupPlaceholder = "写下你的想法…";
    let warmMin = 6;

    if (task.warmup && Array.isArray(task.warmup.choices)) {
      warmupType = "choice";
      warmupTitle = task.warmup.title || "热身问答";
      warmupHint = task.warmup.hint || "";
      warmupChoices = task.warmup.choices;
    } else if (task.warmup && (task.warmup.min || task.warmup.placeholder)) {
      warmupType = "text";
      warmupTitle = task.warmup.title || "写下你的想法";
      warmupHint = task.warmup.hint || "";
      warmupPlaceholder = task.warmup.placeholder || warmupPlaceholder;
      warmMin = task.warmup.min || 6;
    } else if (task.interact === "text") {
      warmupType = "text";
      warmupTitle = "特工手记热身";
      warmupHint = "先写一句感受，再进入问答。";
      warmMin = 6;
    }

    const quizzes = task.quizzes || [];
    const quizIdx = Math.min(this._quizIdx || 0, Math.max(0, quizzes.length - 1));

    this.setData({
      task,
      shortTitle: shortTitle(task.title),
      warmed,
      challenged,
      done,
      photo,
      canFinish: canComplete(id, state) || done,
      warmupType,
      warmupTitle,
      warmupHint,
      warmupChoices,
      warmupPlaceholder,
      warmMin,
      quizzes,
      quizIdx,
      currentQuiz: quizzes[quizIdx] || { q: "", options: [] },
      photoTitle: (task.photo && task.photo.title) || "打卡照",
      photoHint: (task.photo && task.photo.hint) || "",
      challengeText: task.challenge || "",
    });

    wx.setNavigationBarTitle({ title: shortTitle(task.title) });
  },

  onWarmChoice(e) {
    const ok = !!e.currentTarget.dataset.ok;
    if (ok) {
      this._sessionWarmed = true;
      this.setData({
        warmOk: true,
        warmFeedback: "热身通过！进入问答挑战。",
        warmFbCls: "fb ok",
        warmed: true,
        quizIdx: 0,
        currentQuiz: (this.data.quizzes && this.data.quizzes[0]) || { q: "", options: [] },
        quizFeedback: "",
      });
      this._quizIdx = 0;
    } else {
      this.setData({
        warmOk: false,
        warmFeedback: "再想一想，可以看看上方知识点～",
        warmFbCls: "fb bad",
      });
    }
  },

  onWarmText(e) {
    this.setData({ warmText: e.detail.value || "" });
  },

  submitWarmText() {
    const text = (this.data.warmText || "").trim();
    if (text.length < (this.data.warmMin || 6)) {
      this.setData({
        warmOk: false,
        warmFeedback: "再写详细一点（至少 " + this.data.warmMin + " 个字）",
        warmFbCls: "fb bad",
      });
      return;
    }
    const app = getApp();
    const state = app.getState();
    state.notes[this.data.taskId] = text;
    app.setState({ notes: state.notes });
    this._sessionWarmed = true;
    this._quizIdx = 0;
    this.setData({
      warmOk: true,
      warmFeedback: "手记已保存！进入问答。",
      warmFbCls: "fb ok",
      warmed: true,
      quizIdx: 0,
      currentQuiz: (this.data.quizzes && this.data.quizzes[0]) || { q: "", options: [] },
    });
  },

  skipWarm() {
    this._sessionWarmed = true;
    this._quizIdx = 0;
    this.setData({
      warmed: true,
      quizIdx: 0,
      currentQuiz: (this.data.quizzes && this.data.quizzes[0]) || { q: "", options: [] },
    });
  },

  onQuiz(e) {
    const i = Number(e.currentTarget.dataset.i);
    const quiz = this.data.currentQuiz;
    if (!quiz || !quiz.options) return;
    const ok = i === quiz.a;
    if (!ok) {
      this.setData({
        quizOk: false,
        quizFeedback: quiz.tip ? "不对哦～提示：" + quiz.tip : "再试一次！",
        quizFbCls: "fb bad",
      });
      return;
    }

    const next = this.data.quizIdx + 1;
    if (next >= this.data.quizzes.length) {
      const app = getApp();
      const state = app.getState();
      state.challengeOk[this.data.taskId] = true;
      app.setState({ challengeOk: state.challengeOk }, { toast: true, message: "问答通关！" });
      this.setData({
        quizOk: true,
        quizFeedback: "全部答对！去拍照打卡吧。",
        quizFbCls: "fb ok",
        challenged: true,
        canFinish: canComplete(this.data.taskId, app.getState()),
      });
      return;
    }

    this._quizIdx = next;
    this.setData({
      quizOk: true,
      quizFeedback: quiz.tip ? "正确！" + quiz.tip : "正确！",
      quizFbCls: "fb ok",
      quizIdx: next,
      currentQuiz: this.data.quizzes[next],
    });
  },

  takePhoto() {
    const that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera"],
      camera: "back",
      success: function (res) {
        const file = res.tempFiles && res.tempFiles[0];
        if (!file) return;
        wx.showLoading({ title: "保存中" });
        compressImageFile(file.tempFilePath)
          .then(function (compressed) {
            return saveFilePersistent(compressed);
          })
          .then(function (saved) {
            const app = getApp();
            const state = app.getState();
            state.photos[that.data.taskId] = saved;
            state.photoTimes = state.photoTimes || {};
            state.photoTimes[that.data.taskId] = Date.now();
            app.setState(
              { photos: state.photos, photoTimes: state.photoTimes },
              { toast: true, message: "打卡照片已保存" }
            );
            that.setData({
              photo: saved,
              canFinish: canComplete(that.data.taskId, app.getState()),
            });
          })
          .catch(function () {})
          .then(function () {
            wx.hideLoading();
          });
      },
    });
  },

  clearPhoto() {
    const app = getApp();
    const state = app.getState();
    delete state.photos[this.data.taskId];
    if (state.photoTimes) delete state.photoTimes[this.data.taskId];
    app.setState({ photos: state.photos, photoTimes: state.photoTimes });
    this.setData({
      photo: "",
      canFinish: false,
    });
  },

  complete() {
    const app = getApp();
    const state = app.getState();
    const id = this.data.taskId;
    if (state.done[id]) {
      wx.navigateBack();
      return;
    }
    if (!canComplete(id, state)) {
      wx.showToast({ title: "请先完成作答", icon: "none" });
      return;
    }
    state.done[id] = true;
    app.setState({ done: state.done }, { toast: true, message: "任务完成！" });
    this.setData({ done: true, canFinish: true });
    setTimeout(function () {
      wx.navigateBack();
    }, 600);
  },

  goBack() {
    wx.navigateBack();
  },
});
