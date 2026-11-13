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
npm run serve -- --bind 10.0.0.100 --port 81 --baseURL http://10.0.0.100:81/ --appendPort=false
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

## 许可证

[MIT](LICENSE)。
