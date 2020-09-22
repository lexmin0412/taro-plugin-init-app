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

### 指定小程序分包文件夹

支持 `includes` 和 `excludes` 配置，注意 `includes` 优先级较高，当 `includes` 和 `excludes` 同时存在时会忽略 `excludes` 配置。

```js
const plugins = [
  [
    // 入口文件初始化插件
    'taro-plugin-init-app',
    {
      // 配置首页路由
      homeRoute: 'pages/home/index',
      subPackages: {
        // 不纳入分包的文件夹
        // excludes: [
        //  'assets',
        //  'components',
        //  'constants',
        //  'enums',
        //  'interceptors',
        //  'lib',
        //  'pages',
        //  'services',
        //  'store',
        //  'styles',
        //  'utils',
        //  'tencent-webim',
        // ],
        // 指定作为分包打包的文件夹
        includes: [
          'activity',
          'address',
          'assemble',
          'cart',
          'classify',
          'common',
          'couponCenter',
          'demo',
          'dm',
          'goods',
          'integral-mall',
          'live',
          'marketing',
          'medicalUser',
          'order',
          'platform',
          'prescription',
          'register',
          'shop',
          'userCenter',
          'webview'
        ]
      },
    },
  ],
]
```

### 指定打包为页面/组件的文件类型

通过 `compSuffix` 属性可指定需要扫描为页面/组件的文件后缀，未在此列的文件类型将会被过滤。

例如，如果你只想把 tsx 结尾的文件扫描为页面/组件，`compSuffix` 配置项应该像如下这样：

```js
const plugins = [
  [
    'taro-plugin-init-app',
    {
      compSuffix: [ '.tsx' ],
    }
  ]
]
```
