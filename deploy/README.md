# Docker 部署

把站点构建成**单个镜像**（静态文件 + Caddy），用 Compose 运行。

## 使用

1. 把内容放进仓库根目录的 `content/`：

   ```bash
   git submodule add <你的文档仓库地址> content
   ```

2. 构建并启动：

   ```bash
   SITE_URL=https://docs.example.com/ docker compose -f deploy/compose.yaml up -d --build
   ```

   默认 `SITE_URL=http://localhost:8080/`、端口 `8080`，按需设置 `PORT`。

3. 停止：

   ```bash
   docker compose -f deploy/compose.yaml down
   ```

## 构建过程

- 构建阶段：下载 Hugo Extended，用 [deploy/hugo.yaml](hugo.yaml) 渲染 `content/`；内容目录里的图片会同时发布为静态资源
- 运行阶段：`caddy:2-alpine`，站点根目录 `/srv`
- 镜像约 135 MB（500 页规模），运行内存约 15 MB，Compose 限制 128 MB

## 可定制项

| 内容 | 位置 |
|---|---|
| 站点标题 / 描述 / 语言 / 目录深度 | [deploy/hugo.yaml](hugo.yaml) |
| 域名与端口 | `SITE_URL`、`PORT` 环境变量 |
| 缓存头、压缩、404 | [deploy/Caddyfile](Caddyfile) |
| Hugo 版本 | `deploy/Dockerfile` 的 `HUGO_VERSION` |
| 终端提示符 / 动画开关 | `deploy/hugo.yaml` 的 `params.terminal`，或页面 front matter |
