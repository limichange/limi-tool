import formatCode from '../utils/formatCode'
import getConfig from '../utils/getConfig'

export default function component(componentName: string) {
  const componentType = getConfig('component.type')
  const enableCssModule = getConfig('style.cssModule')
  const isReactComponent = componentType === 'react'
  const tag = isReactComponent ? 'div' : 'View'
  const styleFileImportCode = enableCssModule
    ? `import styles from './index.module.css'`
    : `import './index.css'`
  const classNameCode = enableCssModule
    ? `className={styles.${componentName}}`
    : `className='${componentName}'`

  const tsxCode = `
    ${isReactComponent ? '' : `import { View } from '@tarojs/components'`}
    import React from 'react'
    ${styleFileImportCode}

    type Props = {}

    const ${componentName}: React.FC<Props> = () => {
      return (
        <${tag} ${classNameCode}></${tag}>
      )
    }

    export default ${componentName}
  `

  return formatCode(tsxCode)
}
