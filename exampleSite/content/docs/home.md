---
title: 首页与终端
description: 卡片式首页、自定义正文和终端动画，以及如何开启或关闭。
weight: 60
date: 2026-01-03
terminal:
  user: demo
  host: example.com
---

首页有三种形态，由 `content/_index.md` 有没有正文决定。

## 一、卡片式首页（默认）

`content/_index.md` 只有 front matter、没有正文时，主题渲染：

1. 大标题与副标题；
2. 一个"浏览文档"按钮（指向第一个分区）；
3. 卡片列表；
4. "最近更新"列表（需要页面有 `date`）。

卡片有两种来源，优先使用 `params.home.cards`：

```yaml
params:
  home:
    title: 我的笔记
    description: 文档与笔记
    cards:
      - path: /docs/getting-started
        title: 开始使用
        description: 从零开始。
      - path: /docs/configuration
        title: 配置参考
        # 省略 title / description 时，自动用页面的标题和摘要
```

`path` 是 Hugo 内容路径，例如 `docs/getting-started.md` 写成 `/docs/getting-started`。省略 `cards` 时，自动列出每个分区及其文章数。

## 二、自定义正文

在 `_index.md` 里写正文，整页就变成一块自由排版的内容区（外层带 `.home-terminal` 的宽度约束）：

```markdown
---
title: 我的笔记
---

这里是完全自定义的首页，可以放任意 Markdown。
```

## 三、终端风格

最常见的用法是在首页正文里放终端短代码：

````markdown
---
title: 我的笔记
terminal:
  user: yourname
  host: yourhost
---

{{</* terminal */>}}
{{</* termcmd "whoami" */>}}
{{</* termout */>}}
yourname
{{</* /termout */>}}
{{</* /terminal */>}}
````

渲染效果（本页 front matter 已设置 `terminal.user` 和 `terminal.host`）：

{{< terminal >}}
{{< termcmd "whoami" >}}
{{< termout >}}
demo
{{< /termout >}}
{{< termcmd "ls ~/notes" >}}
{{< termout >}}
docs  blog  about.md
{{< /termout >}}
{{< /terminal >}}

## 提示符与标题

窗口标题默认是 `提示符: ~ — shell`，例如 `demo@example.com: ~ — bash`。三种覆盖方式：

```yaml
# 1. 站点级默认值
params:
  terminal:
    user: demo
    host: example.com
    shell: bash

# 2. 页面级覆盖（合并到站点默认值之上）
terminal:
  user: notes
  host: localhost

# 3. 直接覆盖提示符本身
terminal:
  prompt: "notes@localhost:~$"
```

需要完全自定义窗口标题时，用短代码参数：

```markdown
{{</* terminal title="部署脚本 — zsh" */>}}
```

## 开启与关闭动画

| 需求 | 做法 |
| --- | --- |
| 全局关闭打字动画 | `params.terminal.enable: false` |
| 只让某一个窗口静态 | `terminal` 短代码加 `static="true"` |
| 恢复正常动画 | 删除 `enable` 或设为 `true` |

动画只对页面里第一个终端窗口生效，并会自动跳过较长的输出。系统开启"减少动态效果"（`prefers-reduced-motion`）时，直接显示最终内容。

## 常见问题

{{< collapse summary="首页为什么没有显示卡片？" >}}
只有当 `content/_index.md` 没有正文时才会渲染卡片。如果你在首页里写了终端或任何 Markdown，主题会按"自定义正文"处理。
{{< /collapse >}}

{{< collapse summary="为什么只显示一个终端有动画？" >}}
动画脚本只接管页面中第一个终端窗口，其余窗口保持静态，避免多个窗口同时打字。
{{< /collapse >}}

## 下一步

- [短代码](/docs/shortcodes/)：终端短代码的参数表。
- [可选头像](/docs/avatar/)：给标题加一张头像。
