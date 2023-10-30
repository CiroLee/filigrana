<div align="center">
    <img src="https://ciro.club/statics/images/icons/1698646388_2OHZGhOqF2_RefOSY1BXJ.svg" style="width: 320px" alt="banner" />
  </div>
  
# filigrana

it is a Spanish word that refers to watermark in English

easy to use watermark for frontend. it's a pure function tool, suitable for any framework and vanilla.

## Usage

> signature is [here](./types.d.ts)

id:`[string]` watermark container id, default is 'water-mark-id', recommended to fill in a unique id  
text:`[string]` watermark text, default is 'watermark'  
fontColor:`[string]` text watermark color, default is '#ebebeb'  
fontSize:`[string]` text watermark font size, default is 16px  
image:`[string]` image watermark(higher priority than text)  
scale:`[number]` image scaling ratio  
angle:`[number]` watermark rotation angle  
gapX:`[number]` horizontal spacing of watermark default is 4  
gapY:`[number]` vertical spacing of watermark, default is 10  
sparseness:`[string]` watermark sparseness: normal: regular sparse: sparse compressed: compact, default is normal  
antiErase:`[boolean]` whether to enable anti-erase, enabled by default

text watermark

```typescript
// watermarkFn is the easiest way to add watermark
import { watermarkFn } from 'filigrana';
const container = document.getElementById('container');
// first init
const watermark = watermarkFn({
  text: '水印123',
  id: 'water-mark-1',
  angle: 20,
});

// create canvas and mount it to a container, then use render() to render content,
// it will render text or image automatically
watermark.create(container).render();
```

image watermark

```typescript
// render image mask is easy too;
import { watermarkFn } from 'filigrana';
const container = document.getElementById('container');
const watermark = watermarkFn({
  id: 'water-mark-img',
  image: 'your image url',
  angle: 20,
  scale: 0.25,
  sparseness: 'compressed',
});

watermark.create(container).render();
```

fullscreen watermark

```typescript
import { watermarkFn } from 'filigrana';
const watermark = watermarkFn({
  id: 'water-mark-fullscreen',
  text: '😝',
  fontSize: 24,
  angle: -30,
});

// empty param of create() will render fullscreen watermark
watermark.create().render();
```
