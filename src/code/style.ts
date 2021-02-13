import { ISizeCalculationResult } from 'image-size/dist/types/interface'
import path = require('path')
import formatCode from '../utils/formatCode'
import getConfig from '../utils/getConfig'

export default function style(
  componentName: string,
  imageSizeInfo: ISizeCalculationResult,
  imagePath: string
) {
  const code = `
    .${componentName}{
      width: ${imageSizeInfo.width}px;
      height: ${imageSizeInfo.height}px;
      background-image: url('./${path.basename(imagePath)}');
      background-size: 100% 100%;
    }
  `

  return formatCode(code, {
    parser: 'css',
  })
}
