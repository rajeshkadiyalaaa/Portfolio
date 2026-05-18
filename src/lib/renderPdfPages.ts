type PdfJsModule = typeof import('pdfjs-dist');

let pdfjsModule: PdfJsModule | null = null;

const MAX_CACHE_ENTRIES = 16;
const imageCache = new Map<string, string[]>();

function trimPdfCache(): void {
  while (imageCache.size > MAX_CACHE_ENTRIES) {
    const oldest = imageCache.keys().next().value;
    if (oldest === undefined) break;
    imageCache.delete(oldest);
  }
}

export function bucketPdfWidth(width: number): number {
  return Math.max(200, Math.round(width / 40) * 40);
}

async function getPdfJs(): Promise<PdfJsModule> {
  if (!pdfjsModule) {
    pdfjsModule = await import('pdfjs-dist');
    pdfjsModule.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url,
    ).toString();
  }
  return pdfjsModule;
}

export async function renderPdfPages(
  src: string,
  containerWidth: number,
  signal?: AbortSignal,
): Promise<string[]> {
  const renderWidth = bucketPdfWidth(containerWidth);
  const cacheKey = `${src}@${renderWidth}`;
  const cached = imageCache.get(cacheKey);
  if (cached) return cached;

  const pdfjs = await getPdfJs();
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

  const pdf = await pdfjs.getDocument({ url: src, signal }).promise;
  const images: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const page = await pdf.getPage(pageNum);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = renderWidth / baseViewport.width;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport, canvas }).promise;
    images.push(canvas.toDataURL('image/jpeg', 0.85));
  }

  if (images.length > 0) {
    imageCache.set(cacheKey, images);
    trimPdfCache();
  }

  return images;
}
