import getPages from './getPages'
import initApp from './initApp'
import getComponent from './getComponents'

export default (ctx, options) => {
  ctx.onBuildStart(() => {
    console.log(ctx.helper.chalk.yellow('插件 '), 'taro-plugin-init-app');
    console.log(ctx.helper.chalk.greenBright('开始 '), '初始化入口文件');

    // 小程序中编译project.config.json文件
    if (process.env.TARO_ENV === 'weapp') {
      require('./initWeapp')
    }

    getPages(ctx, options).then((pages)=>{
      initApp(pages)
    })

    // 获取所有组件生成文件名
    getComponent()
  })
}