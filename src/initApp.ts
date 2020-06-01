/**
 * 合并模版和配置项生成app.tsx文件
 */

const fs = require('fs')
const chalk = require('chalk')

const initApp = (pages) => {

  let joinPages = ''

  pages.forEach((item, index) => {
    pages[index] = `
      "${item}"`
  })

  joinPages = `    pages: [${pages}
    ],  // 主包页面声明结束 注释用于判断结束行 勿动`
  const appTemplate = fs.readFileSync('./src/app.tsx').toString().split('\n')

  const pageLine =
    appTemplate.findIndex(item => item.indexOf('* 主包页面声明开始') > -1) + 2
  const endPageLine =
    appTemplate.findIndex(item => item.indexOf('// 主包页面声明结束') > -1) + 1
  appTemplate[pageLine] = joinPages

  const indexNum: any = []
  for (let index = 0;index < appTemplate.length;index++) {
    if (index > pageLine && index < endPageLine) {
      appTemplate[index] = ''
      indexNum.push({})
    }
  }

  // 组装模版
  const endTemplate: any = []
  appTemplate.forEach(item => {
    if (item !== '') {
      endTemplate.push(item)
    }
  })

  const templateStr = `${endTemplate.join('\n')}`

  // console.log('生成的templateStr', templateStr)

  if (fs.existsSync('./src/app.tsx')) {
    fs.unlinkSync('./src/app.tsx')
  }
  fs.writeFileSync('./src/app.tsx', templateStr)
  console.log(chalk.greenBright(chalk`✅ 初始化成功 更新入口文件 {green.bold app.tsx}
` ))
}

export default initApp
