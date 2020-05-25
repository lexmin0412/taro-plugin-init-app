export default (ctx, options) => {
  // plugin 主体
  ctx.onBuildStart(() => {
    console.log('编译开始！', options)
  })
  ctx.onBuildFinish(() => {
    console.log('编译结束！', options)
  })
}