/**
 * 合并模版和配置项生成app.tsx文件
 */

const fs = require('fs')

const initApp = (pages) => {
  console.log('initApp pages', pages)

  let joinPages = ''

  pages.forEach((item, index) => {
    pages[index] = `
      "${item}"`
  })

  joinPages = `    pages: [${pages}
    ],  // 主包页面声明结束 注释用于判断结束行 勿动`
  const appTemplate = fs.readFileSync('./src/app.tsx').toString().split('\n')
  console.log('读取app.tsx模版, joinPages', joinPages)

  const pageLine =
    appTemplate.findIndex(item => item.indexOf('* 主包页面声明开始') > -1) + 2
  const endPageLine =
    appTemplate.findIndex(item => item.indexOf('// 主包页面声明结束') > -1) + 1
  console.log
  appTemplate[pageLine] = joinPages

  const indexNum: any = []
  appTemplate.forEach((item, index) => {
    console.log(item)
    if (index > pageLine && index < endPageLine) {
      appTemplate[index] = ''
      indexNum.push({})
    }
  })

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
}

export default initApp
