const fs = require('fs');

/**
 * 判断一个path是否是文件夹
 */
const isDirectory = (path) => {
  return fs.lstatSync(path).isDirectory()
}

/**
 * 小程序配置过滤
 */
const handleMPFilter = (weapp, ctx, pages, path) => {
	/**
	 * 小程序配置处理
	 */
  if (weapp && ctx.runOpts.platform === 'weapp') {
    if (weapp.pages) {
      const {
        includes,
        excludes
      } = weapp.pages;
      // 有includePages时优先判断
      if (includes) {
        if (includes.includes(path)) {
          pages.push(path);
          return;
        }
        return;
      }
      if (excludes) {
        if (!excludes.includes(path)) {
          pages.push(path);
          return;
        }
        return;
      }
      pages.push(path);
      return;
    }
    pages.push(path);
    return;
  }
}

/**
 * h5配置过滤
 */
const handleH5Filter = (h5, ctx, pages, path) => {
  if (h5 && ctx.runOpts.platform === 'h5') {
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
        if (includes.includes(path)) {
          pages.push(path);
          return;
        }
        return;
      }
      if (excludes) {
        if (!excludes.includes(path)) {
          pages.push(path);
          return;
        }
        return;
      }
      pages.push(path);
      return;
    }
    pages.push(path);
    return;
  }
}

/**
 * 数组去重
 * @param {*} weapp
 * @param {*} h5
 * @param {*} ctx
 * @param {*} pages
 * @param {*} path
 */
const handlePurifyArr = (weapp, h5, ctx, pages, subPackageItem, path) => {
  // 去重
  if (pages.indexOf(path) === -1) {
    // 拼接后的路由
    const sliceResPageRoute = path;

    subPackageItem = subPackageItem

    if ((weapp && ctx.runOpts.platform === 'weapp') || (h5 && ctx.runOpts.platform === 'h5')) {
      handleMPFilter(weapp, ctx, pages, sliceResPageRoute)
      handleH5Filter(h5, ctx, pages, sliceResPageRoute)
      return
    }

    pages.push(sliceResPageRoute);
  }
}

/**
 * 扫描pages文件夹生成routes.js 即app.tsx中的pages配置项
 */
const getSubPackages = (ctx, options) => {
  return new Promise(resolve => {
    const {
      chalk
    } = ctx.helper;
    const {
      homeRoute,
      weapp,
      h5,
      subPackages: subPackagesConfig
    } = options;
    console.log(chalk.yellow('开始 '), '进入扫描分包插件')
    let excluedeSubPackages = []
    if (subPackagesConfig && subPackagesConfig.excludes) {
      excluedeSubPackages = subPackagesConfig.excludes
    }
    let indexLines = ''
    const subPackages: any[] = [];
    const outerDirs = fs.readdirSync('./src');
    outerDirs.forEach(item => {
      // 跳过特殊文件夹
      if (!['.DS_Store', ...excluedeSubPackages].includes(item) && isDirectory(`./src/${item}`)) {

        console.log(chalk.magentaBright('读取 '), `发现分包 ${item}`)
        
        const subPackageItem: any = {}
        subPackageItem.root = item
        subPackageItem.name = item
        subPackageItem.pages = []

        const innerDir = fs.readdirSync(`./src/${item}`);
        // 去除后缀名
        innerDir.forEach(inItem => {
          if (['assets', 'components', 'css', 'interface', 'services', 'enums'].includes(inItem)) {
            return
          }

          // 如果是文件夹则再次遍历
          if (isDirectory(`./src/${item}/${inItem}`)) {

            const deepInnerDir = fs.readdirSync(`./src/${item}/${inItem}`)

            deepInnerDir.forEach(deepInnerItem => {

              if (['assets', 'components', 'component', 'css', 'interface', 'services', 'enums'].includes(deepInnerItem)) {
                return
              }

              const sliceRes = deepInnerItem.slice(0, deepInnerItem.indexOf('.'));
              // 数组去重
              handlePurifyArr(weapp, h5, ctx, subPackageItem.pages, item, `${inItem}/${sliceRes}`)
            })

          } else {
            const sliceRes = inItem.slice(0, inItem.indexOf('.'));
            handlePurifyArr(weapp, h5, ctx, subPackageItem.pages, item, `${sliceRes}`)
          }
        });

        subPackages.push(subPackageItem)
      }
    });
    subPackages.forEach(item => {
      if (item !== homeRoute) {
        indexLines = indexLines ?
          `${indexLines}
  '${item}',` :
          `'${item}',`;
      }
    });
    indexLines = `${indexLines}

]

module.exports = pages`;

    console.log(`${chalk.blueBright('结束 ')}`, `分包页面扫描完成✅
    `)
    resolve(subPackages)
  });
};

export default getSubPackages