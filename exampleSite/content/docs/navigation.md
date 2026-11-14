---
title: 导航与目录
description: 内容目录如何变成侧边栏，以及排序、隐藏和目录的开关。
weight: 30
date: 2026-01-06
---

## 目录即导航

左侧导航完全由内容目录生成，不需要维护菜单配置。每一级目录对应一个折叠分组：

```text
content/
├── _index.md          # 首页
├── docs/
│   ├── _index.md      # 分区页
│   ├── getting-started.md
│   └── advanced/
│       └── tuning.md  # 更深一级的分组
└── blog/
    └── 2026/
        └── post.md
```

- 目录里有**子页面**时渲染成可展开的分组，当前页面的分组会自动展开。
- 目录里只有 `_index.md`、没有子页面时，直接渲染成一个普通链接。
- 分区页 `_index.md` 有正文时，分组内会多出一个“概览”入口。

## 排序：weight

同一级里的顺序由 front matter 的 `weight` 决定，数值小的排前面：

```yaml
---
title: 开始使用
weight: 10
---
```

不写 `weight` 时按日期和标题排序。

## 隐藏页面

`toc_hide: true` 会把页面从侧边栏和分区列表里移除，但页面本身仍然可以访问：

```yaml
---
title: 内部备注
toc_hide: true
---
```

适合放附录、草稿或被其他页面链接的补充材料。

## 关闭本页目录

文章默认在右侧显示二级、三级标题组成的“本页内容”。在 front matter 里关闭：

```yaml
---
title: 一篇不需要目录的短页面
notoc: true
---
```

## 面包屑与移动端

- 正文顶部显示“首页 / 分区 / 页面”的面包屑，它同样来自内容目录。
- 窄屏下右侧目录自动收起；左上角的“目录”按钮可以打开侧边栏，按 `Esc` 或点击遮罩关闭。

## 相关

- [书写与排版](/docs/writing/)：front matter 的完整字段表。
- [配置参考](/docs/configuration/)：目录层级的其他设置。
