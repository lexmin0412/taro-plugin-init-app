/**
 * 判断文件是否是支持的类型
 * @param fileName 文件名
 * @param supportedSuffix 支持的后缀数组
 */
const isFileSupported = (fileName: string, supportedSuffix: Array<string>) => {
  const fileSuffix = fileName.slice(fileName.lastIndexOf('.'));
  if (!supportedSuffix.includes(fileSuffix)) {
    return false
  }
  return true
}

export default isFileSupported