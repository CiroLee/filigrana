import type { WaterMarkOption, InitCanvasOption, Sparseness } from './types';
export function watermarkFn(option?: WaterMarkOption): WaterMark {
  const waterMarkInstance = new WaterMark(option);
  return waterMarkInstance;
}

const DEFAULT_GAP = {
  x: 4,
  y: 10,
};

const DEFAULT_COLOR = '#ebebeb';

export class WaterMark {
  id: string;
  el: HTMLElement | undefined;
  canvas: HTMLCanvasElement | undefined;
  ctx: CanvasRenderingContext2D | undefined;
  gapX = DEFAULT_GAP.x;
  gapY = DEFAULT_GAP.y;
  scale = 1;
  fontColor = DEFAULT_COLOR;
  fontSize = 16;
  antiEase = true;
  sparseness: Sparseness = 'normal';
  text: string | undefined;
  image: string | undefined;
  angle: number | undefined;
  isInit: boolean = false;
  constructor(option?: WaterMarkOption) {
    // init params
    this.id = option?.id || 'water-mark-id';
    this.text = option?.text;
    this.image = option?.image;
    this.angle = option?.angle;
    this.scale = option?.scale || 1;
    this.fontColor = option?.fontColor || DEFAULT_COLOR;
    this.fontSize = option?.fontSize || 16;
    this.antiEase = option?.antiEase ?? true;
    this.sparseness = option?.sparseness || 'normal';
    this.initGap(option?.gapX, option?.gapY, this.sparseness);
  }

  private initGap(gapX?: number, gapY?: number, sparseness?: Sparseness) {
    if (gapX || gapY) {
      this.gapX = Math.max(gapX || DEFAULT_GAP.x, 2);
      this.gapY = Math.max(gapY || DEFAULT_GAP.y, 2);
    } else if (sparseness === 'sparse') {
      this.gapX = DEFAULT_GAP.x * 2;
      this.gapY = DEFAULT_GAP.y * 2;
    } else if (sparseness === 'compressed') {
      this.gapX = DEFAULT_GAP.x * 0.6;
      this.gapY = DEFAULT_GAP.y * 0.6;
    }
  }
  // 初始化canvas - 适配高清屏
  private initCanvas(option: InitCanvasOption) {
    const { canvas, width, height } = option;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = true;
    ctx.scale(dpr, dpr);
  }
  // 添加canvas节点
  addCanvas(el?: HTMLElement | null) {
    const canvas = (document.getElementById(this.id) as HTMLCanvasElement) || document.createElement('canvas');
    canvas.setAttribute('id', this.id);
    if (!el) {
      canvas.setAttribute('style', 'position:fixed; z-index: 9999; inset: 0; pointer-events:none;');
    } else {
      canvas.setAttribute('style', 'position:absolute; z-index: 9999; inset: 0; pointer-events:none;');
    }

    const width = this.el!.offsetWidth;
    const height = this.el!.offsetHeight;
    this.initCanvas({ canvas, width, height });
    this.el!.appendChild(canvas);
    return canvas;
  }

  create(el?: HTMLElement) {
    this.el = el || document.body;
    this.isInit = true;
    this.canvas = this.addCanvas(el);
    this.ctx = this.canvas.getContext('2d')!;
    if (this.antiEase && this.isInit) {
      this.antiEaseObserver();
    }
    return this;
  }
  render() {
    if (!this.image) {
      this.renderText(this?.text || 'watermark', this.angle);
    } else {
      this.renderImage(this.image, this.angle);
    }
  }
  antiEaseObserver() {
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(() => {
      const watermarkEl = document.getElementById(this.id);
      if (!watermarkEl) {
        this.create(this.el);
        this.render();
      }
    });
    observer.observe(document.body, config);
  }

  private renderOneText(text: string, x: number, y: number) {
    if (!this.canvas || !this.ctx) return;
    this.ctx.font = `${this.fontSize}px sans-serif`;
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = this.fontColor;
    this.ctx.fillText(text, x, y);
  }
  renderImage(image: string, angle?: number) {
    const img = new Image();
    img.src = image;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!this.canvas || !this.ctx) return;
      const width = img.width;
      const height = img.height;
      const rows = Math.floor(this.canvas.width / width) * window.devicePixelRatio;
      const columns = Math.floor(this.canvas.height / height) * window.devicePixelRatio;
      this.ctx.save();
      this.ctx.rotate((angle || 0 * Math.PI) / 180);
      this.ctx.translate(-this.canvas.width * this.scale, -this.canvas.height * this.scale);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          this.ctx.drawImage(
            img,
            r * this.gapX * width * this.scale,
            c * this.gapY * height * this.scale,
            width * this.scale,
            height * this.scale,
          );
        }
      }
      this.ctx.restore();
    };
  }
  renderText(text: string, angle?: number) {
    if (!this.canvas || !this.ctx) return;
    const textObj = this.ctx.measureText(text);
    const rows = Math.floor(this.canvas.width / textObj.width);
    const columns = Math.floor(this.canvas.height / textObj.actualBoundingBoxAscent);
    this.ctx.save();
    this.ctx.rotate((angle || 0 * Math.PI) / 180);
    this.ctx.translate(-this.canvas.width, -this.canvas.height);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        this.renderOneText(text, r * this.gapX * textObj.width, c * this.gapY * textObj.actualBoundingBoxAscent);
      }
    }
    this.ctx.restore();
  }
}
