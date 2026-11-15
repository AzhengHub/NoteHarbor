# AGENTS.md

NoteHarbor 是一个用 Hugo 构建的文档与博客主题。

## 常用命令

npm run serve   # 本地预览 :1313
npm test        # 构建并校验示例站

## 约定

- 正文第一行不要写 `---`，会和页面分隔线叠成双线。
- `private: true` 只影响搜索 / RSS / sitemap 和 noindex，不是访问控制。
- 单页和列表页模板要同步改。

## 提交

没有明确说“提交代码”时，不要 commit，也不要 push。

## 发布

本站改动测试通过后默认发布到生产环境。用户另有说明时，按当次要求执行。
