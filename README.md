# Taro app初始化插件

## 功能

- 自动扫描pages并合并到app.tsx中到pages配置项，可配置需要/不需要打包的页面
- 自动扫描components并生成components/index.ts文件

## 安装

```bash
npm install taro-plugin-init-app -D
```

## 使用

### 小程序指定页面不打包

```js
// config/index.js
const config = {
  plugins: [
    [
      // 入口文件初始化插件
      'taro-plugin-init-app',
      {
        // 配置首页路由
        homeRoute: 'pages/home/index',
        weapp: {
          pages: {
            // 指定不需要打包的页面
            excludes: [
              'pages/test/index',
              'pages/test/index2'
            ],
          }
        },
      },
    ],
  ]
}
```

### 小程序指定页面打包

```js
// config/index.js
const config = {
  plugins: [
    [
      // 入口文件初始化插件
      'taro-plugin-init-app',
      {
        // 配置首页路由
        homeRoute: 'pages/home/index',
        weapp: {
          pages: {
            // 指定需要打包的页面
            includes: [
              'pages/home/index',
              'pages/user/index'
            ],
          }
        },
      },
    ],
  ]
}
```

### h5指定页面不打包

```js
// config/index.js
const config = {
  plugins: [
    [
      // 入口文件初始化插件
      'taro-plugin-init-app',
      {
        // 配置首页路由
        homeRoute: 'pages/home/index',
        h5: {
          pages: {
            // 指定不需要打包的页面
            excludes: [
              'pages/test/index',
              'pages/test/index2'
            ],
          }
        },
      },
    ],
  ]
}
```

### h5指定页面打包

```js
// config/index.js
const config = {
  plugins: [
    [
      // 入口文件初始化插件
      'taro-plugin-init-app',
      {
        // 配置首页路由
        homeRoute: 'pages/home/index',
        h5: {
          pages: {
            // 指定需要打包的页面
            includes: [
              'pages/home/index',
              'pages/user/index'
            ],
          }
        },
      },
    ],
  ]
}
```
