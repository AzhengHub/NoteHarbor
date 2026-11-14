---
title: 可选头像
description: 在站点标题旁显示头像，开启和关闭都只改一行配置。
weight: 70
date: 2026-01-02
---

头像默认是**关闭**的：不配置 `params.avatar` 时，左上角只显示站点标题，外观和没有这个功能时完全一样。

本示例站点开启了头像（就是标题左侧那个蓝色占位图），你可以对照 `exampleSite/hugo.yaml` 查看配置。

## 开启

两步：放图片、写路径。

1. 把图片放进静态资源目录，例如 `static/avatar.png`；
2. 在 `hugo.yaml` 里加上：

```yaml
params:
  avatar: /avatar.png
```

图片路径以 `/` 开头，相对于站点根目录。示例站点用的是 `exampleSite/static/avatar.svg`，所以配置写成 `/avatar.svg`（同时把 `staticDir` 指向了 `exampleSite/static`）。

## 关闭

删除配置，或把值留空：

```yaml
params:
  avatar: ""
```

两种写法都会让模板跳过渲染，页面上不会留下空占位。

## 外观与尺寸

| 属性 | 桌面 | 窄屏（< 768px） |
| --- | --- | --- |
| 头像直径 | 40px | 34px |
| 站点标题字号 | 20px | 17px |
| 头像与标题间距 | 9px | 9px |

头像渲染在标题**左侧**、垂直居中，并被裁成圆形（`border-radius: 50%` + `object-fit: cover`），所以方形图片不会变形。

想调整尺寸，改主题样式里的两处：

```css
.brand{font-size:20px; gap:9px}
.brand-avatar{width:40px; height:40px}
```

超过约 44px 时，需要同时调高顶栏高度（`.site-header{height:60px}`），否则头像会贴边。

## 建议

- 图片用正方形，至少 80×80，避免小图放大后发虚。
- 想换回文字标题，直接删掉 `params.avatar` 即可，不需要动模板。
- 头像只是展示用，不要把它当作身份认证或权限手段。

## 相关

- [配置参考](/docs/configuration/)：`params` 下的全部参数。
- [首页与终端](/docs/home/)：另一个可以"开或关"的外观选项。
