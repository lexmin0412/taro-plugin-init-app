/**
 * 合并模版和配置项生成app.tsx文件
 */

const fs = require('fs');
const chalk = require('chalk');
const initApp = ({pages, subPackages}) => {
  let joinPages = '';
  pages.forEach((item, index) => {
    pages[index] = `
      "${item}"`;
  });
  subPackages.forEach((element, index) => {
    let subPackageItemPages = ``
    element.pages.forEach(elePageItem => {
      subPackageItemPages = `${subPackageItemPages}
					"${elePageItem}",`
    });
    subPackages[index] = `
			{
				root: "${element.root}",
				name: "${element.name}",
				pages: [${subPackageItemPages}
				]
			}`
  });
  joinPages = `    pages: [${pages}
		],
		subPackages: [${subPackages}
		],  // 页面声明结束 注释用于判断结束行 勿动`;
  const appTemplate = fs.readFileSync('./src/app.tsx').toString().split('\n');
  // 找到开始行
  const pageLine = appTemplate.findIndex(item => item.indexOf('* 主包页面声明开始') > -1) + 2;
  // 找到结束行
  const endPageLine = appTemplate.findIndex(item => item.indexOf('页面声明结束') > -1) + 1;
  // 拼接主包页面
  appTemplate[pageLine] = joinPages;
  const indexNum: any[] = [];
  for (let index = 0;index < appTemplate.length;index++) {
    if (index > pageLine && index < endPageLine) {
      appTemplate[index] = '';
      indexNum.push({});
    }
  }
  // 组装模版
  const endTemplate: any[] = [];
  appTemplate.forEach(item => {
    if (item !== '') {
      endTemplate.push(item);
    }
  });
  const templateStr = `${endTemplate.join('\n')}`;
  // console.log('生成的templateStr', templateStr)
  if (fs.existsSync('./src/app.tsx')) {
    fs.unlinkSync('./src/app.tsx');
  }
  fs.writeFileSync('./src/app.tsx', templateStr);
  console.log(chalk.greenBright(chalk`✅ 初始化成功 更新入口文件 {green.bold app.tsx}
`));
};

export default initApp
