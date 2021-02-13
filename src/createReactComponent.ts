import * as path from 'path'
import * as fs from 'fs-extra'
import pascalCase from './utils/pascalCase'
import component from './code/component'
import style from './code/style'
import imageSize from 'image-size'
import getConfig from './utils/getConfig'

export default function createReactComponent(filePath: string) {
  const componentName = pascalCase(path.basename(filePath).split('.')[0])
  const imageSizeInfo = imageSize(filePath)
  const imageFileName = path.basename(filePath)
  const componentPath = path.join(path.dirname(filePath), componentName)
  const enableCssModule = getConfig('style.cssModule')
  const styleFileName = enableCssModule ? 'index.module.css' : 'index.css'

  try {
    fs.moveSync(filePath, path.join(componentPath, imageFileName))

    fs.writeFile(
      path.join(componentPath, 'index.tsx'),
      component(componentName)
    )

    fs.writeFile(
      path.join(componentPath, styleFileName),
      style(componentName, imageSizeInfo, filePath)
    )
  } catch (e) {
    console.log(e)
  }
}