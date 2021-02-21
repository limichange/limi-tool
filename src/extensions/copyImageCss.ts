import * as vscode from 'vscode'
import imageSize from 'image-size'

export default async function copyImageCss(uri: vscode.Uri) {
  const imageSizeInfo = imageSize(uri.path)

  const cssString = `
    width: ${imageSizeInfo.width};
    height: ${imageSizeInfo.height};
  `

  vscode.env.clipboard.writeText(cssString)
  vscode.window.showInformationMessage(cssString)
}
