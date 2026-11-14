---
title: 页脚
description: 两段文字、四种对齐方式，以及如何只留下版权信息。
weight: 80
date: 2026-01-02
---

## 配置

```yaml
params:
  footer:
    copyright: "© 2026 我的笔记"
    poweredby: "Powered by Hugo"
    align: center
```

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `copyright` | `© 当前年份 + 站点标题` | 左段文字，纯文本 |
| `poweredby` | `Powered by Hugo` | 右段文字 |
| `align` | `center` | `center`、`between`、`left`、`right` |

## 三种常见写法

只保留版权，隐藏右段：

```yaml
params:
  footer:
    copyright: "© 2026 我的笔记"
    poweredby: ""
    align: center
```

左右分开：

```yaml
params:
  footer:
    copyright: "© 2026 我的笔记"
    poweredby: "由 Hugo 驱动"
    align: between
```

完全使用默认值：不写 `params.footer` 时，页脚显示 `© 当前年份 + 站点标题` 和 `Powered by Hugo`。

{{% alert title="注意" color="warning" %}}
`poweredby` 的默认值只在**键不存在**时生效。写 `poweredby: ""` 是"存在但为空"，所以会隐藏；直接删掉这个键则会重新显示默认文案。
{{% /alert %}}

## 对齐效果

- `center`：两段文字居中排列（默认，适合短页脚）。
- `between`：左右两端分开，适合放版权与备案信息。
- `left` / `right`：整体靠左或靠右。

## 相关

- [配置参考](/docs/configuration/)：其他 `params` 参数。
