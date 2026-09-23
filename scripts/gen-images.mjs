// Renders PNG assets from the SVG sources for social sharing / touch icons.
// Run with: node scripts/gen-images.mjs
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

async function render(svgFile, outFile, width, height) {
  const svg = readFileSync(join(root, svgFile))
  await sharp(svg, { density: 300 })
    .resize(width, height, { fit: 'fill' })
    .png()
    .toFile(join(root, outFile))
  console.log(`✓ ${outFile} (${width}x${height})`)
}

await render('og-image.svg', 'og-image.png', 1200, 630)
await render('favicon.svg', 'apple-touch-icon.png', 180, 180)
await render('favicon.svg', 'favicon-32.png', 32, 32)
console.log('Done.')
