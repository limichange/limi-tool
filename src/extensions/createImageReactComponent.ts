import * as path from 'path'
import * as fs from 'fs-extra'
import pascalCase from '../utils/pascalCase'
import component from '../code/component'
import style from '../code/style'
import imageSize from 'image-size'
import getConfig from '../utils/getConfig'
import * as vscode from 'vscode'
import openFile from '../utils/openFile'

export default async (uri: vscode.Uri, fileList: vscode.Uri[]) => {
  const list = fileList && fileList.length ? fileList : [uri]

  for (const file of list) {
    try {
      await createImageReactComponent(file.path)
    } catch (err) {
      console.error(err)
    }
  }
}

async function createImageReactComponent(filePath: string) {
  const componentName = pascalCase(path.basename(filePath).split('.')[0])
  const imageSizeInfo = imageSize(filePath)
  const imageFileName = path.basename(filePath)
  const componentPath = path.join(path.dirname(filePath), componentName)
  const componentIndexFilePath = path.join(componentPath, 'index.tsx')
  const enableCssModule = getConfig('style.cssModule')
  const styleFileName = enableCssModule ? 'index.module.css' : 'index.css'

  try {
    fs.moveSync(filePath, path.join(componentPath, imageFileName))

    fs.writeFile(
      path.join(componentPath, styleFileName),
      style(componentName, imageSizeInfo, filePath)
    )

    await fs.writeFile(componentIndexFilePath, component(componentName))

    openFile(componentIndexFilePath)
  } catch (e) {
    console.log(e)
  }
}
