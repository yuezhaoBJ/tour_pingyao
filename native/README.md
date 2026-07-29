# 山西时空特工 · 原生微信小程序（方案 B）

本目录是可导入微信开发者工具、上传发布的**完整原生小程序资源包**（不依赖 web-view）。

## 目录结构

```
native/                         ← 用开发者工具打开这一层（不要开上级，也不要开子目录）
├── project.config.json
├── project.private.config.json
├── app.js / app.json / app.wxss
├── sitemap.json
├── data/locations.js           # 四景点任务/知识点/问答数据
├── utils/storage.js            # 本地进度存储
├── utils/util.js
├── assets/                     # 任务封面等静态图
├── pages/
│   ├── welcome/                # 代号 + 特工照片
│   ├── index/                  # 景点切换 + 任务清单
│   ├── task/                   # 热身 / 问答 / 拍照打卡 / 完成
│   └── report/                 # 报告预览、单张/批量保存到相册（含水印）
├── sync-from-h5.sh
└── README.md
```

## 已实现能力

| 能力 | 实现 |
|------|------|
| 特工报到 | 昵称 + `wx.chooseMedia` 拍照/选图 |
| 四景点切换 | 平遥 / 王家大院 / 绵山 / 壶口 |
| 任务流程 | 知识点 → 热身(选择/手记) → 问答 → 现场拍照 → 完成 |
| 进度持久化 | `wx.setStorage`（按景点隔离） |
| 任务报告 | 瀑布流预览、点按看大图 |
| 下载打卡照 | Canvas 叠加头像+标题+地点+时间水印，`saveImageToPhotosAlbum` |

相对 H5：特殊互动（珠算、镖局小游戏等）在原生版简化为「知识点 + 热身/问答 + 拍照」；文案与题目数据与主站一致。

## 使用步骤

1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)  
2. **导入项目** → 目录必须选 **`native`**（里面有 `project.config.json` + `app.json`）  
3. 填写你的 **AppID**（或先用测试号；发布需正式认证账号）  
4. 修改 `project.config.json` 中的 `"appid"`  
5. 编译预览 → 真机调试（拍照、存相册必须真机）  
6. 上传 → 提交审核 → 发布  

### 若出现 `define is not defined` / `require is not defined`

说明工程目录开错了，或缓存坏了。按顺序做：

1. 关闭当前项目  
2. 重新导入，路径选到 `.../tour_pingyao/native`（不要选仓库根目录，也不要选曾经的 `miniprogram` 子目录）  
3. 菜单：**工具 → 清除缓存 → 全部清除**，再点编译  

### 后台必配

1. **用户隐私保护指引**：勾选「选中的照片或视频信息」「相册（仅写入）」等与拍照/存图相关的项  
2. 真机调试时若弹出隐私授权，按提示同意后再测拍照与保存相册  

> 注意：`app.json` 的 `requiredPrivateInfos` **只能**填写地理位置类接口（如 `getLocation`）。本小程序不用定位，因此**不要**把 `chooseMedia` / `saveImageToPhotosAlbum` 写进该字段，否则会报错 `-80422`。

### 若扫码预览「特工报到」空白

常见原因：增强编译 / 工程目录开错，导致渲染层崩溃（只有标题栏、内容区空白）。

请按顺序操作：

1. **关闭**当前项目  
2. **重新导入**目录：`tour_pingyao/native`（必须能看到同级的 `app.js` + `project.config.json`）  
3. **工具 → 清除缓存 → 全部清除**  
4. 详情 → 本地设置：关闭「增强编译」「多线程/多帧运行时」  
5. 模拟器基础库选 **2.33.0**（或与 `project.config.json` 一致）  
6. 再点 **编译**，确认模拟器报到页有表单后，再重新生成预览二维码  

> 工程已默认关闭 `enhance`；报到页不再依赖 `require`，避免模块加载失败时整页空白。

## 本地开发提示

若模拟器出现 **`Unexpected token .` / `wx is not defined` / `enableUpdateWxAppCode`**：

1. 确认打开的是 **`native` 目录**（与 `app.json`、`project.config.json` 同级）
2. **工具 → 清除缓存 → 全部清除**，再编译
3. 详情 → 本地设置：关闭「启用多线程 / 多帧运行时」类选项（工程已默认关闭）
4. 模拟器基础库选 **3.3.x** 左右；仍不行可升级微信开发者工具后重开项目

- 基础库建议 **≥ 2.24**（离屏 Canvas 水印）；过低时可升级调试基础库  
- 存储空间有限：打卡图会压缩并 `saveFile`；配额不足时会尝试清理非当前景点照片  
- 改主站 `index.html` 里的任务文案后，可用下方脚本重新导出 `data/locations.js`  

```bash
# 在仓库根目录执行
./native/sync-from-h5.sh
```

或手动：

```bash
# 在仓库根目录执行：从 index.html 重新抽取地点数据
python3 - <<'PY'
import re
from pathlib import Path
root = Path('index.html').read_text(encoding='utf-8')
m = re.search(r'const LOCATIONS = (\[[\s\S]*?\n    \]);\n\n    /\*\* @type', root)
assert m, 'LOCATIONS not found'
js = 'module.exports = ' + m.group(1).replace('cover: "assets/', 'cover: "/assets/') + ';\n'
Path('native/data/locations.js').write_text(js, encoding='utf-8')
print('updated native/data/locations.js')
PY
```

同步任务图：

```bash
rm -rf native/assets/tasks
cp -R assets/tasks native/assets/
```

## 审核说明草稿

> 本小程序为山西亲子文化探索任务清单：用户完成知识点问答并现场拍照打卡，生成个人任务报告。照片仅保存在用户设备本地存储，用于报告展示与保存到系统相册；不上传服务器。

## 与方案 A（web-view）区别

| | `web-view/` | `native/`（本包） |
|--|-------------|-------------------|
| 形态 | 小程序壳 + 外链 H5 | 原生页面 |
| 托管 | 需单独 HTTPS 部署 H5 | **只需上传小程序** |
| 拍照/存相册 | 受 web-view 限制 | 微信原生 API，更稳 |
| 改版成本 | 改 H5 即可 | 改 WXML/JS |

---

导入 **`native` 目录**即可开始调试；上线前务必换成正式 AppID 并完成隐私配置。
