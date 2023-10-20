export type Sparseness = 'normal' | 'sparse' | 'compressed';
/**
 * el:           canvas挂载元素，默认挂载在body上
 * text:         水印文字 (优先级高于图片) 默认为watermark
 * fontColor     文字水印颜色
 * fontSize      文字水印字体大小
 * image:        图片水印
 * scale:        图片缩放比例
 * angle:        水印旋转角度
 * gapX:         水印水平间距
 * gapY:         水印垂直间距
 * sparseness:   水印稀疏程度: normal: 常规 sparse: 稀疏 compressed: 紧凑
 * antiEase:      是否开启防止擦除, 默认开启
 */
export interface WaterMarkOption {
  id?: string;
  text?: string;
  fontColor?: string;
  fontSize?: number;
  image?: string;
  scale?: number;
  angle?: number;
  gapX?: number;
  gapY?: number;
  sparseness?: Sparseness;
  antiEase?: boolean;
}

export interface InitCanvasOption {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}
