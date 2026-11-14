---
title: 开始使用
description: 安装依赖、本地预览，以及把主题引入你自己的站点。
weight: 10
date: 2026-01-08
---

NoteHarbor 是一个基于 Hugo 的文档与个人博客主题。它把清晰的内容结构、本地搜索和轻量的阅读体验放在一起，让你把注意力留在写作上。

## 环境要求

| 依赖 | 版本 | 用途 |
| --- | --- | --- |
| Hugo | Extended 0.153 或更新 | 构建站点，主题会用到扩展版能力 |
| Node.js | 20.19 或更新 | 只在本仓库开发主题时需要 |
| npm | 随 Node.js 安装 | 构建 React / Tailwind 资源 |

使用主题搭建自己的站点时不需要 Node.js，因为构建好的前端资源已经随主题发布。

## 本地预览

在仓库根目录执行：

```bash
npm ci
npm run serve
```

`npm run serve` 会先构建前端资源，再用 `exampleSite/hugo.yaml` 启动 Hugo 开发服务器，默认地址是 `http://localhost:1313/`。

想在局域网里预览，把参数透传给 Hugo：

```bash
npm run serve -- --bind 0.0.0.0 --port 1313 \
  --baseURL http://192.168.1.10:1313/ --appendPort=false
```

## 生成静态文件

```bash
npm run build      # 输出到 public/
npm test           # 校验示例站点：页面、搜索索引、RSS 与站点地图
```

只构建、不动前端资源时，也可以直接调用 Hugo：

```bash
hugo --config exampleSite/hugo.yaml --minify
```

## 目录结构

```text
NoteHarbor/
├── assets/            # 样式、字体、构建好的搜索资源
├── exampleSite/       # 示例站点，也就是你现在看到的文档
│   ├── content/       # 文档内容
│   ├── static/        # 示例站点的静态资源（如头像）
│   └── hugo.yaml      # 配置参考
├── layouts/           # 模板与短代码
├── frontend/          # React / Tailwind 源码
├── deploy/            # Docker 部署文件
└── package.json       # npm 脚本
```

## 作为主题使用

在自己的站点目录里引入：

```bash
hugo mod init example.com/my-site
hugo mod get github.com/AzhengHub/NoteHarbor@latest
```

然后在站点的 `hugo.yaml` 中声明模块：

```yaml
module:
  imports:
    - path: github.com/AzhengHub/NoteHarbor
```

也可以把仓库克隆到 `themes/NoteHarbor`，改用传统方式：

```yaml
theme: NoteHarbor
```

内容放在站点的 `content/` 下，目录结构会自动变成侧边栏，详见[导航与目录](/docs/navigation/)。

## 下一步

- [配置参考](/docs/configuration/)：所有参数的含义和默认值。
- [首页与终端](/docs/home/)：换一种更有个性的首页。
- [书写与排版](/docs/writing/)：Front matter 字段与 Markdown 排版。
