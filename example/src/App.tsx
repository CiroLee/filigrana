import { WaterMark, watermarkFn } from '@lib/index.mjs';
import { useEffect, useRef, useState } from 'react';
import img from './assets/water-mark.png';
function App() {
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const [fullMark, setFullMark] = useState(false);
  const watermark1: WaterMark = watermarkFn({
    text: '水印123',
    id: 'water-mark-1',
    angle: 20,
  });
  const watermark2: WaterMark = watermarkFn({
    id: 'water-mark-2',
    image: img,
    angle: 20,
    scale: 0.25,
    sparseness: 'compressed',
  });
  const watermark3: WaterMark = watermarkFn({
    id: 'water-mark-fullscreen',
    text: '😝',
    fontSize: 24,
    angle: -30,
  });
  useEffect(() => {
    if (!fullMark) {
      box1Ref.current && watermark1.create(box1Ref.current);
      box2Ref.current && watermark2.create(box2Ref.current).render();
    } else {
      watermark3.create().render();
    }
  }, [fullMark]);
  return (
    <div className="px-8">
      <div className="mx-auto mb-3">
        <h3 className="mb-2 text-lg">文字水印</h3>
        <div ref={box1Ref} className="h-[300px] bg-blue-200 overflow-hidden relative"></div>
      </div>
      <div className="mx-auto mb-3">
        <h3 className="mb-2 text-lg">图片水印</h3>
        <div ref={box2Ref} className="h-[300px] bg-blue-200 overflow-hidden relative"></div>
      </div>

      <button
        className="bg-blue-500 text-white flex items-center justify-center text-sm px-4 py-2 rounded-md"
        onClick={() => {
          setFullMark(true);
        }}>
        全屏水印
      </button>
    </div>
  );
}

export default App;
