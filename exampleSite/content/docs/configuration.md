---
title: 配置参考
description: 一份带注释的完整配置，逐项说明每个参数。
weight: 20
date: 2026-01-07
---

主题的全部配置都在站点的 `hugo.yaml` 里。示例站点自己的配置文件是 [exampleSite/hugo.yaml](https://github.com/AzhengHub/NoteHarbor/blob/main/exampleSite/hugo.yaml)，可以直接对照阅读。

## 完整示例

```yaml
baseURL: https://example.com/
title: 我的笔记
contentDir: content
staticDir: static

defaultContentLanguage: zh
languageCode: zh-CN
enableRobotsTXT: true

params:
  description: 我的文档和笔记
  avatar: /avatar.png          # 可选，删除即关闭
  github: https://github.com/your-name/your-repository
  showReadingTime: true

  terminal:
    user: user
    host: localhost
    shell: bash
    enable: true

  footer:
    copyright: "© 2026 我的笔记"
    poweredby: "Powered by Hugo"
    align: center

  home:
    title: 我的笔记
    description: 文档与笔记
    cards:
      - path: /docs/getting-started
        title: 开始使用
        description: 从零开始。

outputs:
  home: [HTML, RSS, JSON]
  section: [HTML, RSS]

markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    noClasses: false
  tableOfContents:
    startLevel: 2
    endLevel: 3
```

## 站点级参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `baseURL` | string | 站点根地址，部署到子路径时要写成完整地址 |
| `title` | string | 站点标题，显示在左上角与浏览器标签页 |
| `contentDir` | string | 内容目录，默认 `content` |
| `staticDir` | string | 静态资源目录，默认 `static` |
| `defaultContentLanguage` | string | 默认语言，界面文案为中文，建议 `zh` |
| `languageCode` | string | 语言代码，建议 `zh-CN` |
| `enableRobotsTXT` | bool | 是否生成 `robots.txt` |

## params

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `description` | 空 | 站点描述，用于首页副标题、meta description 与 RSS |
| `avatar` | 空 | 可选头像的图片地址，详见[可选头像](/docs/avatar/) |
| `github` | 空 | 右上角 GitHub 图标链接，留空则不显示 |
| `showReadingTime` | `false` | 是否显示“约 N 分钟阅读” |
| `terminal.user` | `user` | 终端提示符里的用户名 |
| `terminal.host` | `localhost` | 终端提示符里的主机名 |
| `terminal.shell` | `bash` | 窗口标题里的 shell 名 |
| `terminal.prompt` | 自动拼接 | 直接覆盖提示符，设置后忽略 user / host |
| `terminal.enable` | `true` | 终端打字动画的总开关 |
| `footer.copyright` | `© 年份 + 站点标题` | 页脚左段文字 |
| `footer.poweredby` | `Powered by Hugo` | 页脚右段文字，设为空字符串可隐藏 |
| `footer.align` | `center` | 可选 `center`、`between`、`left`、`right` |
| `home.title` | 站点标题 | 首页大标题 |
| `home.description` | `params.description` | 首页副标题 |
| `home.cards` | 空 | 首页卡片列表，省略时自动列出内容分区 |

{{% alert title="提示" %}}
`params.version` 这类参数不会被模板读取：配置文件里写了也不报错，但页面上不会出现。需要展示版本号时，请写进 `footer.copyright` 或 `home.description`。
{{% /alert %}}

## outputs

`outputs.home` 必须包含 `JSON`，否则不会生成搜索索引：

```yaml
outputs:
  home: [HTML, RSS, JSON]
  section: [HTML, RSS]
```

## markup

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true        # 允许在 Markdown 里直接写 HTML
  highlight:
    noClasses: false       # 代码高亮使用内联样式
  tableOfContents:
    startLevel: 2          # 右侧目录从二级标题开始
    endLevel: 3
```

## 下一步

- [首页与终端](/docs/home/)：`params.home` 与 `params.terminal` 的用法。
- [页脚](/docs/footer/)：`params.footer` 的三种对齐方式。
- [搜索](/docs/search/)：搜索索引与排除规则。
