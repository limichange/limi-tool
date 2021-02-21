import * as vscode from 'vscode'
import copyImageCss from './extensions/copyImageCss'
import createImageReactComponent from './extensions/createImageReactComponent'
import createReactComponent from './extensions/createReactComponent'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('limi-tool.copyImageCss', copyImageCss)
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'limi-tool.createImageReactComponent',
      createImageReactComponent
    )
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'limi-tool.createReactComponent',
      createReactComponent
    )
  )
}

// this method is called when your extension is deactivated
export function deactivate() {}
