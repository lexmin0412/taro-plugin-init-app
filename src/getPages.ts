const fs = require('fs')

/**
 * 扫描pages文件夹生成routes.js 即app.tsx中的pages配置项
 */
const getPages = (ctx, options) => {
  return new Promise(resolve => {
    const { chalk } = ctx.helper
    const {homeRoute, weapp, h5 } = options
    console.log(chalk.yellow('开始 '), '进入扫描页面插件')

    if (fs.existsSync('./src/pages/routes.js')) {
      fs.unlinkSync('./src/pages/routes.js')
      console.log(`${chalk.redBright('删除 ')}`, `旧的${chalk.greenBright('pages/route.js')}`)
    }

    let indexLines = `/**
 * 路由文件 编译时自动生成，无需手动修改，但页面有增删改操作时需要重启项目
 */

const pages = [
  '${homeRoute}',`
    const pages: any = []

    const outerDirs = fs.readdirSync('./src/pages')

    outerDirs.forEach(item => {
      // 跳过特殊文件夹
      if (!['.DS_Store'].includes(item)) {
        const innerDir = fs.readdirSync(`./src/pages/${item}`)

        // 去除后缀名
        innerDir.forEach(inItem => {
          const sliceRes = inItem.slice(0, inItem.indexOf('.'));
          // 去重
          if (pages.indexOf(`pages/${item}/${sliceRes}`) === -1 &&
            !['component'].includes(sliceRes)) {
            // 拼接后的路由
            const sliceResPageRoute = `pages/${item}/${sliceRes}`;
						/**
						 * 小程序配置处理
						 */
            if (weapp && ctx.runOpts.platform === 'weapp') {
              console.log('是小程序环境', weapp)
              console.log('当前路由', sliceResPageRoute)
              if (weapp.pages) {
                const {
                  includes,
                  excludes
                } = weapp.pages;
                // 有includePages时优先判断
                if (includes) {
                  if (includes.includes(sliceResPageRoute)) {
                    console.log('includePages包含了 直接push')
                    pages.push(sliceResPageRoute);
                    return;
                  }
                  return
                }
                if (excludes) {
                  if (!excludes.includes(sliceResPageRoute)) {
                    console.log('进入excludePages')
                    pages.push(sliceResPageRoute);
                    return;
                  }
                  return
                }
                pages.push(sliceResPageRoute);
                return;
              }
              pages.push(sliceResPageRoute);
              return;
            } else if (h5 && ctx.runOpts.platform === 'h5') {
							/**
							 * h5配置处理
							 */
              if (h5.pages) {
                const {
                  includes,
                  excludes
                } = h5.pages;
                // 有includePages时优先判断
                if (includes) {
                  if (includes.includes(sliceResPageRoute)) {
                    console.log('includePages包含了 直接push')
                    pages.push(sliceResPageRoute);
                    return;
                  }
                  return
                }
                if (excludes) {
                  if (!excludes.includes(sliceResPageRoute)) {
                    console.log('进入excludePages')
                    pages.push(sliceResPageRoute);
                    return;
                  }
                  return
                }
                pages.push(sliceResPageRoute);
                return;
              }
              pages.push(sliceResPageRoute);
              return;
            }
            pages.push(sliceResPageRoute);
          }
        });
      }
    })

    pages.forEach(item => {
      if (item !== homeRoute) {
        indexLines = indexLines
          ? `${indexLines}
  '${item}',`
          : `'${item}',`
      }
    })

    indexLines = `${indexLines}

]

module.exports = pages`

    let resolvePages = [
      homeRoute
    ]
    pages.forEach(element => {
      if (element !== homeRoute ) {
        resolvePages.push(element)
      }
    });

    fs.writeFileSync('./src/pages/routes.js', indexLines)
    console.log(`${chalk.cyanBright('创建 ')}`, `pages/routes.js 成功
${
      chalk.blueBright('结束 ')}`, `页面扫描完成✅
`)
    resolve(resolvePages)
  })
}

export default getPages