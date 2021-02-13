import * as vscode from 'vscode'
import imageSize from 'image-size'
import createReactComponent from './createReactComponent'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'limi-tool.copyImageCss',
    (response) => {
      const imageSizeInfo = imageSize(response.path)

      const cssString = `
				width: ${imageSizeInfo.width};
				height: ${imageSizeInfo.height};
			`

      vscode.env.clipboard.writeText(cssString)
      vscode.window.showInformationMessage(cssString)
    }
  )

  context.subscriptions.push(disposable)

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'limi-tool.createReactComponent',
      async (uri: vscode.Uri, fileList: vscode.Uri[]) => {
        const list = fileList && fileList.length ? fileList : [uri]

        for (const file of list) {
          try {
            await createReactComponent(file.path)
          } catch (err) {
            console.error(err)
          }
        }
      }
    )
  )
}

// this method is called when your extension is deactivated
export function deactivate() {}
