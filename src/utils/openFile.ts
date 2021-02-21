import * as vscode from 'vscode'

export default function openFile(path: string) {
  const openPath = vscode.Uri.parse('file://' + path)
  vscode.workspace.openTextDocument(openPath).then((doc) => {
    vscode.window.showTextDocument(doc)
  })
}
