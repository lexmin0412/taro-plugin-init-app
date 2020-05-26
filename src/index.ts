import getPages from './getPages'
import initApp from './initApp'
import getComponent from './getComponents'
import checkEnv from './checkEnv'
import initWeapp from './initWeapp'

export default (ctx, options) => {
  // plugin 主体
  ctx.onBuildStart(() => {
    console.log('编译开始！', options)

    // 小程序中编译project.config.json文件
    if (process.env.TARO_ENV === 'weapp') {
      require('./project')
    }

    getPages().then((pages)=>{
      initApp(pages)
    })

    // 获取所有组件生成文件名
    getComponent()

    // 检查环境变量
    checkEnv()

    // 生成小程序project.config.json
    initWeapp()
  })
  ctx.onBuildFinish(() => {
    console.log('编译结束！', options)
  })
}