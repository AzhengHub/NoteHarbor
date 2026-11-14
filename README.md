# NoteHarbor

一个使用 Hugo 构建的个人文档与博客主题，为笔记、文档和长篇文章提供清晰、安静的阅读空间。主题使用 Hugo 模板和自定义样式实现页面布局，搜索弹窗与按钮基于 [shadcn/ui](https://github.com/shadcn-ui/ui)、Radix UI 与 React；shadcn/ui 组件以源码形式维护在本项目中，许可证见 [frontend/SHADCN-LICENSE.md](frontend/SHADCN-LICENSE.md)。

## 功能

- 根据内容目录自动生成多级侧边栏；分类可展开、收起，当前路径自动展开。
- 文档正文目录、代码高亮和复制、折叠内容与提示块。
- 基于本地 JSON 索引的全文搜索，支持 `Ctrl/⌘ + K`。
- 可选头像、可配置页脚，支持深色和浅色主题。
- 适配桌面与手机，自带 RSS、站点地图与 Docker 部署方案。

## 快速开始

需要 Hugo Extended 0.153 或更新版本；只有开发主题本身时才需要 Node.js 20.19+。

```bash
npm ci
npm run serve
```

默认访问 `http://localhost:1313/`；`npm run build` 生成 `public/`，`npm test` 校验示例站点。

## 文档

示例站点就是主题的文档。`exampleSite/` 里的每一页都演示一项能力，并给出可以直接复制的配置，运行 `npm run serve` 后从 `/docs/` 开始阅读。

## 安装为 Hugo Module

```bash
hugo mod init example.com/my-site
hugo mod get github.com/AzhengHub/NoteHarbor@latest
```

```yaml
module:
  imports:
    - path: github.com/AzhengHub/NoteHarbor
```

## 许可证

[MIT](LICENSE)。主题内置 [Mona Sans](https://github.com/github/mona-sans) 可变字体（SIL Open Font License 1.1），许可证全文见 [assets/fonts/LICENSE-MonaSans.txt](assets/fonts/LICENSE-MonaSans.txt)。
