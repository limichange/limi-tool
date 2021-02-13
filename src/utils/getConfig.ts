import * as vscode from 'vscode'

export default function getConfig(section: string) {
  const configuration = vscode.workspace.getConfiguration('limiTool')

  return configuration.get(section)
}
