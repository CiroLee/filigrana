# filigrana

it is a Spanish word that refers to watermark in English

easy to use watermark for frontend. it's a pure function tool, suitable for any framework and vanilla.

## Usage

> signature is [here](./types.d.ts)

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
// if will render text or image automatically
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
// watermarkFn is the easiest way to add watermark
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
