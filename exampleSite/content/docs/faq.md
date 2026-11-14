---
title: 常见问题
description: 构建失败、导航为空、头像不显示等问题的排查顺序。
weight: 110
date: 2025-12-20
---

## 构建时报 Hugo 版本过低

主题要求 **Hugo Extended 0.153 或更新**。先确认版本：

```bash
hugo version
```

输出里应包含 `extended`。用包管理器装到的版本往往偏旧，建议从 Hugo 官方发布页下载扩展版。

## 侧边栏是空的

侧边栏完全由内容生成，检查：

1. 内容是否放在 `contentDir` 指向的目录里；
2. 文件是否有 front matter（至少 `title`）；
3. 页面是否被 `toc_hide: true` 隐藏了。

## 头像不显示

{{< collapse summary="按顺序排查" >}}
1. `params.avatar` 是否填写了以 `/` 开头的路径；
2. 图片是否在 `staticDir` 目录下（默认 `static/`）；
3. 路径大小写是否和文件名一致；
4. 直接访问 `https://你的站点/avatar.png` 是否能打开。
{{< /collapse >}}

## 搜索没有结果

- 确认 `outputs.home` 包含 `JSON`；
- 确认页面没有被 `private: true` 或 `exclude_search: true` 排除；
- 清理后重新构建：`hugo --cleanDestinationDir`。

## 终端没有打字动画

| 现象 | 原因 |
| --- | --- |
| 直接显示全部内容 | `params.terminal.enable: false`，或用了 `static="true"` |
| 只有第一个窗口有动画 | 设计如此，脚本只接管第一个终端 |
| 完全没有动画 | 系统开启了"减少动态效果" |

## 修改样式后前端没变化

主题自带构建好的 `assets/generated/`。只有修改 React / Tailwind 源码时才需要重新构建：

```bash
npm run build:ui
```

普通 CSS 调整直接改 `assets/css/main.css` 即可，Hugo 会重新指纹化并刷新缓存。

## 中文内容里的短代码没有渲染

短代码和普通 Markdown 的边界容易混：`alert` 用 `{{%/* %*/%}}` 包起来，其余短代码用 `{{</* */>}}`。写在代码块里的短代码会原样显示，不会被渲染。

## 还需要帮助

先看[配置参考](/docs/configuration/)和[短代码](/docs/shortcodes/)，大部分问题都能在那两页找到答案。
