const fs = require('fs')
const chalk = require('chalk')
import isFileSupported from './utils/fiterSuffix'

/**
 * 扫描components文件夹生成index.ts 以支持一行代码写完组件引入
 * 示例：import { Card, TImage } from '~/components'
 */
const checkComponent = (options) => {
  const {compSuffix} = options
  console.log(chalk.yellow('开始 '), '进入扫描组件插件')

  if (fs.existsSync('./src/components/index.ts')) {
    fs.unlinkSync('./src/components/index.ts')
    console.log(`${chalk.redBright('删除 ')} 旧的${chalk.greenBright('index.ts')}`)
  }

  let indexLines = `/**
 * 注意：此文件为编译时自动生成，无需手动修改
*/
`
  let Names = ``

  const outerDirs = fs.readdirSync('./src/components')

  outerDirs.forEach((item) => {
    const innerDir = fs.readdirSync(
      `./src/components/${item}`
    )

    // 去除后缀名
    const newLines: any = []
    innerDir.forEach((inItem) => {
      // 过滤文件类型
      if (!isFileSupported(inItem, compSuffix)) {
        return
      }
      const sliceRes = inItem.slice(0, inItem.indexOf('.'))
      // 去重
      if (newLines.indexOf(sliceRes) === -1) {
        console.log(chalk.magentaBright('读取 '), `发现组件 ${sliceRes}`);
        newLines.push(sliceRes)
        Names = Names
          ? `${Names}
  ${sliceRes},`
          : `${sliceRes},`
      }
    })

    newLines.forEach((inItem) => {
      indexLines = indexLines
        ? `${indexLines}
import ${inItem} from './${item}/${inItem}';`
        : `import ${inItem} from './${item}/${inItem}';`
    })
  })
  indexLines = `${indexLines}

export {
  ${Names}
}`

  fs.writeFileSync('./src/components/index.ts', indexLines)
  console.log(`${chalk.cyanBright('创建 ')}`, `components/index.ts 成功
${
    chalk.blueBright('结束 ')}`, `组件扫描完成✅
` )
}

export default checkComponent
