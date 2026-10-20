/**
 * Image loader for next/image. Unsplash resizes on its own CDN, so we just ask
 * for the right width instead of using the Next.js image optimizer. This keeps
 * the site fast and free to host on Vercel.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  if (src.startsWith("https://picsum.photos/")) {
    return src.replace(/\/\d+(\/\d+)?(\?.*)?$/, `/${width}/${width}`);
  }
  return src;
}
