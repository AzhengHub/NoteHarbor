---
title: 书写与排版
description: Front matter 字段、Markdown 排版与代码块效果。
weight: 40
date: 2026-01-05
---

这一页本身就是排版示例：往下看可以看到标题、列表、表格、引用和代码块在主题里的样子。

## Front matter

| 字段 | 类型 | 作用 |
| --- | --- | --- |
| `title` | string | 页面标题，同时用于导航和搜索 |
| `description` | string | 摘要，用于列表、搜索索引与 meta description |
| `date` | date | 发布日期，影响排序与“最近更新” |
| `weight` | int | 同级排序，小的在前 |
| `private` | bool | 排除搜索、RSS、站点地图，并输出 noindex |
| `exclude_search` | bool | 只从搜索索引里排除 |
| `toc_hide` | bool | 从侧边栏和分区列表里隐藏 |
| `notoc` | bool | 关闭本页右侧目录 |

```yaml
---
title: 我的第一篇笔记
description: 一段简短的介绍。
date: 2026-01-08
weight: 10
---
```

## 标题与段落

二级、三级标题会被收集到右侧的“本页内容”。标题层级保持连续，读者更容易扫读。

短段落、明确的小标题，比一大段密集文字更耐读。

### 一份清单

- 用一个问题开始。
- 记下过程和关键决定。
- 留下下一步，而不是追求一次完成。

## 代码块

代码块带语法高亮，右上角有复制按钮：

```bash
hugo --minify
hugo server --bind 0.0.0.0
```

```yaml
params:
  footer:
    align: center
```

## 表格

| 内容 | 适合记录 |
| --- | --- |
| 笔记 | 一个想法、一条命令或一段过程 |
| 文档 | 可以复用的指南和参考 |
| 随笔 | 更完整的观察和思考 |

## 引用

> 不必等到想法完美才开始记录。笔记可以随着时间慢慢生长。

## 链接与强调

行内代码写作 `params.avatar`，强调使用 **加粗** 或 *斜体*，站内链接写成[相对路径](/docs/shortcodes/)。

## 下一步

- [短代码](/docs/shortcodes/)：提示块、折叠块和终端窗口。
- [搜索](/docs/search/)：让内容可被检索，以及排除规则。
