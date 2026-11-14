---
title: 构建与部署
description: 静态构建、子路径部署，以及单镜像 Docker 方案。
weight: 100
date: 2025-12-28
---

## 静态构建

```bash
npm run build            # 构建前端资源 + Hugo 站点，输出到 public/
hugo --minify            # 只构建站点（前端资源已随主题提供）
```

`public/` 是纯静态文件，可以放到任何 Web 服务器、对象存储或 CDN 后面。

## 部署到子路径

站点挂在 `https://example.com/docs/` 这类子路径时，把 `baseURL` 写成完整地址：

```yaml
baseURL: https://example.com/docs/
```

Hugo 生成的所有链接都会带上这个前缀。如果反向代理改写了路径，用 `hugo --baseURL` 在构建时覆盖也可以。

## Docker 单镜像

仓库自带 [deploy/](https://github.com/AzhengHub/NoteHarbor/tree/main/deploy) 目录，把静态文件和 Caddy 打进一个镜像。

1. 把内容仓库放到 `content/`：

   ```bash
   git submodule add <你的文档仓库地址> content
   ```

2. 构建并启动：

   ```bash
   SITE_URL=https://docs.example.com/ docker compose -f deploy/compose.yaml up -d --build
   ```

默认访问 `http://localhost:8080/`，端口和域名分别由 `PORT`、`SITE_URL` 控制。

| 内容 | 位置 |
| --- | --- |
| 站点标题、描述、终端提示符 | `deploy/hugo.yaml` |
| 域名与端口 | `SITE_URL`、`PORT` |
| 缓存头、压缩、404 | `deploy/Caddyfile` |
| Hugo 版本 | `deploy/Dockerfile` 的 `HUGO_VERSION` |

## 发布前检查

- 运行 `npm test`，确认示例站点的页面、搜索索引、RSS 与站点地图都正常。
- 确认 `public/` 里没有不该公开的内容（`private` 不是访问控制）。
- 站点地图与 RSS 分别位于 `public/sitemap.xml`、`public/index.xml`。

## 相关

- [开始使用](/docs/getting-started/)：本地开发命令。
- [搜索](/docs/search/)：索引生成与排除规则。
