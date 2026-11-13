---
title: 搜索你的笔记
description: 不离开页面，快速找到需要的内容。
weight: 20
date: 2026-01-03
---

## 本地搜索

点击顶部搜索框，或使用 **Ctrl / ⌘ + K** 打开搜索。搜索索引由 Hugo 在构建时生成，不需要外部搜索服务。

## 排除页面

在文章 front matter 中设置 `exclude_search: true`，可以将该页面排除在搜索索引之外。标记 `private: true` 的页面同样不会进入索引。

{{% alert title="请注意" color="warning" %}}
排除搜索并不等于限制访问。如果页面包含私人内容，请使用服务器认证，或不要将其发布到公开站点。
{{% /alert %}}
