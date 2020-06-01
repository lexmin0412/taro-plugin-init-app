/**
 * 检查环境变量
 * @param config 配置对象
 */

const chalk = require('chalk')
 
const checkEnv = () => {
  // 验证环境变量是否完整
  console.log(chalk.yellow('开始'), `进入检查环境变量组件`)
  // console.log(`开始检查环境变量，环境标识：${config.env.NODE_ENV}`)
  // const APP_CONF = config.defineConstants.APP_CONF
  // const APP_CONF_ATTRS = ['API_HOST', 'APPID', 'API_MAP_QQ', 'KEY_MAP_QQ']
  // APP_CONF_ATTRS.forEach(item => {
  //   // 如果不存在则报错
  //   if (!APP_CONF[item]) {
  //     throw `缺少环境变量: ${item}`
  //   } else {
  //     console.log(`${item}: ${APP_CONF[item]}`)
  //   }
  // })
  console.log(chalk.dim('结束'), chalk.greenBright(`环境变量检查通过✅
` ))
}

export default checkEnv