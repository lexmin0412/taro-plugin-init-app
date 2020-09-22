import getPages from './getPages'
import initApp from './initApp'
import getComponent from './getComponents'
import getSubPackages from './getSubPackages'

export default (ctx, options) => {
  ctx.onBuildStart(() => {
    console.log(ctx.helper.chalk.yellow('插件 '), 'taro-plugin-init-app');
    console.log(ctx.helper.chalk.greenBright('开始 '), '初始化入口文件');

    // 扫描页面
    Promise.all([
      getPages(ctx, options),
      getSubPackages(ctx, options)
    ]).then((res)=>{
      initApp(res[0], res[1])
    })
    // 获取所有组件生成文件名
    getComponent(options)
  })
}