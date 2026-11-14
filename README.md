# NoteHarbor

一个使用 Hugo 构建的个人文档与博客主题，为笔记、文档和长篇文章提供清晰、安静的阅读空间。示例站点中的内容均为虚构示例。

NoteHarbor 使用 Hugo 模板和自定义样式实现页面布局，并在搜索弹窗和按钮中使用 [shadcn/ui](https://github.com/shadcn-ui/ui)、Radix UI 与 React。shadcn/ui 组件以源码形式维护在本项目中；组件的许可证见 [frontend/SHADCN-LICENSE.md](frontend/SHADCN-LICENSE.md)。

## 功能

- 根据内容目录自动生成多级侧边栏；分类可展开、收起，当前路径自动展开。
- 文档正文目录、代码高亮和复制、折叠内容与提示块。
- 基于本地 JSON 索引的全文搜索，支持 `Ctrl/⌘ + K`。
- 适配桌面与手机，支持深色和浅色主题。
- 示例首页、文章列表、RSS 和站点地图。

## 本地开发

需要 Hugo Extended 0.153 或更新版本、Node.js 20.19 或更新版本，以及 npm。

```bash
npm ci
npm run serve
```

默认访问 `http://localhost:1313/`。用于部署的静态文件可通过 `npm run build` 生成在 `public/`，运行 `npm test` 验证示例站点。

要在指定的内网地址和端口预览，可以将 Hugo 参数传给命令：

```bash
npm run serve -- --bind 192.168.1.10 --port 81 --baseURL http://192.168.1.10:81/ --appendPort=false
```

## 在自己的 Hugo 站点中使用

主题仓库发布后，可将它作为 Hugo Module 引入。先安装 Go 和 Hugo Extended，然后在你的站点目录执行：

```bash
hugo mod init example.com/my-site
hugo mod get github.com/AzhengHub/NoteHarbor@latest
```

在站点的 `hugo.yaml` 中配置：

```yaml
baseURL: https://example.com/
title: 我的笔记
defaultContentLanguage: zh
languageCode: zh-CN
module:
  imports:
    - path: github.com/AzhengHub/NoteHarbor
outputs:
  home: [HTML, RSS, JSON]  # JSON 是本地搜索索引
  section: [HTML, RSS]
params:
  description: 我的文档和笔记
  github: https://github.com/your-name/your-repository
  showReadingTime: true
```

在 `content/` 下按目录存放 Markdown，即可自动生成导航。`exampleSite/content/` 是可参考的完整示例，`exampleSite/hugo.yaml` 展示了首页卡片配置。首页卡片可以用 `params.home.cards` 配置，每项的 `path` 指向 Hugo 内容路径；省略时自动显示最近的文章。`params.home.title` 和 `params.home.description` 可修改首页标题和介绍。

主题已经包含构建好的前端资源；使用主题的站点不需要安装 Node.js。只有修改本主题的 React 或 Tailwind 源码时才需要运行 `npm run build:ui`，并将生成的 `assets/generated/` 一同提交。

## 内容与发布

Markdown 可以使用 Hugo front matter 设置 `title`、`description`、`date` 和 `weight`。页面设置 `exclude_search: true` 可从搜索索引中排除；设置 `private: true` 也会排除搜索、RSS 和站点地图，并添加 `noindex` 元数据。

**这些选项不是访问控制。** Hugo 仍然会生成页面，知道网址的人仍可访问；私有仓库里的文档只要被构建并部署到公开站点，就会变成公开内容。不要将不希望公开的内容放进公开站点的构建产物。主题与个人内容分仓维护时，请在构建流程中明确选择要发布的内容。

## 页脚

页脚两段文字都在站点配置里改：

```yaml
params:
  footer:
    copyright: "© 2026 你的站点"
    poweredby: "Powered by Hugo"   # 设为空字符串可隐藏
    align: center                  # center（默认）| between | left | right
```

## 首页终端

首页 `_index.md` 可以只用 `terminal`、`termcmd`、`termout` 短代码搭一个逐字打印的终端窗口。提示符在页面 front matter 或站点参数里配置：

```yaml
terminal:
  user: user
  host: localhost
  shell: bash              # 窗口标题里的 shell 名，默认 bash
  prompt: "user@host:~$"   # 可选，直接覆盖 user@host
```

窗口标题由提示符自动生成（`user@host: ~ — bash`），不需要在短代码里重复写 `title`；需要完全自定义时仍可用 `title` 覆盖。

- `{{</* terminal static="true" */>}}`：只展示终端窗口，不播放打字动画
- 站点参数 `params.terminal.enable: false`：全局关闭动画
- 窗口里的内容是普通 Markdown，可以自由替换成任何自定义内容

## Docker 部署

把内容放在仓库根目录的 `content/`（可用 `git submodule` 引入），然后构建单镜像（静态文件 + Caddy）运行：

```bash
SITE_URL=https://docs.example.com/ docker compose -f deploy/compose.yaml up -d --build
```

默认访问 `http://localhost:8080/`，详见 [deploy/README.md](deploy/README.md)。镜像约 135 MB，运行内存约 15 MB。

## 许可证

[MIT](LICENSE)。

主题内置 [Mona Sans](https://github.com/github/mona-sans) 可变字体（SIL Open Font License 1.1），许可证全文见 [assets/fonts/LICENSE-MonaSans.txt](assets/fonts/LICENSE-MonaSans.txt)。
