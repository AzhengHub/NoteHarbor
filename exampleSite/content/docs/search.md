---
title: 搜索
description: 本地全文搜索、快捷键，以及如何把页面排除在索引之外。
weight: 90
date: 2026-01-01
---

## 打开方式

点击顶部的搜索框，或按 **Ctrl + K**（macOS 上是 **⌘ + K**）。搜索在浏览器本地完成，不会把内容发到任何外部服务。

## 索引是怎么来的

构建时 Hugo 会把所有可搜索页面汇总成 `index.json`，搜索脚本加载它并做匹配：

```yaml
outputs:
  home: [HTML, RSS, JSON]   # 缺了 JSON 就没有搜索索引
```

每个条目包含标题、所属分区、摘要和正文纯文本。索引体积随内容增长，几百页的站点通常在几 MB 量级。

## 排除页面

在 front matter 里加 `exclude_search: true`：

```yaml
---
title: 临时草稿
exclude_search: true
---
```

页面仍然可以通过网址访问，只是不会出现在搜索结果里。

## 与 private 的区别

| 字段 | 搜索 | RSS / 站点地图 | `noindex` | 页面可访问 |
| --- | --- | --- | --- | --- |
| `exclude_search: true` | 排除 | 保留 | 否 | 是 |
| `private: true` | 排除 | 排除 | 是 | 是 |

{{% alert title="这不是访问控制" color="warning" %}}
`private` 和 `exclude_search` 只影响索引与元数据。Hugo 依然会生成页面，知道网址的人仍然可以访问。真正私密的内容请放在需要登录的服务器后面，或者不要放进公开构建。
{{% /alert %}}

## 检查结果

```bash
hugo --config exampleSite/hugo.yaml --minify
python3 -c "import json;print(len(json.load(open('public/index.json'))))"
```

输出的数字就是可搜索页面数。少了，通常是漏了 `outputs.home` 里的 `JSON`，或者页面被标记成了 `private` / `exclude_search`。

## 相关

- [内容与发布](/docs/deploy/)：构建产物里会出现什么。
- [配置参考](/docs/configuration/)：`outputs` 的写法。
