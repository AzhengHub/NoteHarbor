---
title: 短代码
description: 提示块、折叠块和终端窗口的可复制示例。
weight: 50
date: 2026-01-04
terminal:
  user: demo
  host: example.com
---

主题内置三组短代码。下面每一段都是可以直接复制到 Markdown 里的写法，示例即为渲染结果。

## 提示块 alert

`alert` 支持两种颜色：默认的 `info`（蓝色）和 `warning`（琥珀色）。

{{% alert title="这是一条提示" %}}
适合放补充说明、使用建议或版本变化。
{{% /alert %}}

```markdown
{{%/* alert title="这是一条提示" */%}}
适合放补充说明、使用建议或版本变化。
{{%/* /alert */%}}
```

{{% alert title="这是一条警告" color="warning" %}}
适合放容易踩坑的地方，比如"删除后不可恢复"或"这不是访问控制"。
{{% /alert %}}

```markdown
{{%/* alert title="这是一条警告" color="warning" */%}}
适合放容易踩坑的地方。
{{%/* /alert */%}}
```

`title` 可以省略；`color` 省略时就是默认的 `info`。

## 折叠块 collapse

长命令、附注或可选项适合收起来，让正文保持清爽。

{{< collapse summary="展开查看一条小提示" >}}
把暂时不需要的信息放进折叠块，读者需要时再展开。
{{< /collapse >}}

```markdown
{{</* collapse summary="展开查看一条小提示" */>}}
把暂时不需要的信息放进折叠块，读者需要时再展开。
{{</* /collapse */>}}
```

`summary` 省略时显示"点击展开"。

## 终端窗口

`terminal`、`termcmd`、`termout` 三个短代码组合出一个终端窗口，用来展示命令行流程。

{{< terminal >}}
{{< termcmd "whoami" >}}
{{< termout >}}
demo
{{< /termout >}}
{{< termcmd "hugo version" >}}
{{< termout >}}
hugo v0.153.2+extended linux/amd64
{{< /termout >}}
{{< /terminal >}}

```markdown
{{</* terminal */>}}
{{</* termcmd "whoami" */>}}
{{</* termout */>}}
demo
{{</* /termout */>}}
{{</* /terminal */>}}
```

### 参数

| 位置 | 参数 | 说明 |
| --- | --- | --- |
| `terminal` | `static="true"` | 只渲染静态窗口，不播放打字动画 |
| `terminal` | `title="..."` | 覆盖窗口标题（默认由提示符和 shell 自动生成） |
| `termcmd` | 第一个位置参数 | 要展示的命令 |
| `termout` | 无 | 中间的内容按 Markdown 渲染为命令输出 |

提示符由 `params.terminal` 或页面的 `terminal` front matter 决定：

```yaml
params:
  terminal:
    user: demo
    host: example.com
    shell: bash
    prompt: "demo@example.com:~$"   # 可选，直接覆盖 user@host
```

{{% alert title="动画可以关掉" color="warning" %}}
`params.terminal.enable: false` 会全局关闭打字动画；单次关闭用 `static="true"`。系统开启"减少动态效果"时动画也会自动跳过。
{{% /alert %}}

## 下一步

- [首页与终端](/docs/home/)：把终端放到首页。
- [配置参考](/docs/configuration/)：`params.terminal` 的全部字段。
