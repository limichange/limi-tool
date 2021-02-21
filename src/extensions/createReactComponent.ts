import * as path from 'path'
import * as fs from 'fs-extra'
import pascalCase from '../utils/pascalCase'
import component from '../code/component'
import style from '../code/style'
import getConfig from '../utils/getConfig'
import * as vscode from 'vscode'

export default async (uri: vscode.Uri) => {
  const componentName = await vscode.window.showInputBox({
    placeHolder: 'input component name',
  })

  const documentUri = vscode.window.activeTextEditor?.document?.uri

  if (!uri && documentUri) {
    uri = documentUri
  }

  if (!componentName) return
  if (!uri) return

  try {
    await createComponent(uri.path, pascalCase(componentName))
  } catch (err) {
    console.error(err)
  }
}

async function createComponent(filePath: string, componentName: string) {
  const componentPath = path.join(path.dirname(filePath), componentName)
  const enableCssModule = getConfig('style.cssModule')
  const styleFileName = enableCssModule ? 'index.module.css' : 'index.css'

  try {
    await fs.ensureDir(componentPath)

    fs.writeFile(
      path.join(componentPath, 'index.tsx'),
      component(componentName)
    )

    fs.writeFile(path.join(componentPath, styleFileName), style(componentName))
  } catch (e) {
    console.log(e)
  }
}
