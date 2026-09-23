// Generates elegant, self-contained perfume-bottle SVG illustrations.
// These are hand-built vectors so they are always correct, on-brand, and never
// depend on unpredictable stock photos. Run: node scripts/gen-bottles.mjs
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'products')
mkdirSync(outDir, { recursive: true })

// A bottle "recipe": background gradient + glass tint + liquid color + cap +
// an optional shape variant. Produces a 600x600 studio-style illustration.
function bottle({
  bg1, bg2,        // backdrop gradient
  glass,           // glass stroke color
  liquid1, liquid2, // liquid gradient
  cap,             // cap color
  accent,          // label/accent color
  label,           // short label text on the bottle
  shape = 'classic', // classic | tall | flacon | cube
}) {
  const shapes = {
    // x,y,w,h,rx for the body + neck width
    classic: { bx: 200, by: 235, bw: 200, bh: 250, brx: 26, nw: 54 },
    tall: { bx: 225, by: 205, bw: 150, bh: 285, brx: 20, nw: 48 },
    flacon: { bx: 185, by: 250, bw: 230, bh: 230, brx: 60, nw: 60 },
    cube: { bx: 205, by: 250, bw: 190, bh: 220, brx: 10, nw: 58 },
  }
  const s = shapes[shape]
  const neckX = 300 - s.nw / 2
  const capX = 300 - (s.nw + 28) / 2

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <radialGradient id="spot" cx="0.5" cy="0.32" r="0.6">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${liquid1}"/>
      <stop offset="1" stop-color="${liquid2}"/>
    </linearGradient>
    <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="0.25" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- backdrop -->
  <rect width="600" height="600" fill="url(#bg)"/>
  <rect width="600" height="600" fill="url(#spot)"/>
  <!-- reflection floor -->
  <ellipse cx="300" cy="520" rx="150" ry="26" fill="#000000" opacity="0.28"/>

  <!-- cap -->
  <rect x="${capX}" y="120" width="${s.nw + 28}" height="60" rx="8" fill="${cap}"/>
  <rect x="${capX}" y="120" width="${s.nw + 28}" height="60" rx="8" fill="url(#glassSheen)"/>
  <!-- neck -->
  <rect x="${neckX}" y="178" width="${s.nw}" height="${s.by - 178 + 6}" fill="${liquid2}" opacity="0.9"/>

  <!-- bottle body -->
  <rect x="${s.bx}" y="${s.by}" width="${s.bw}" height="${s.bh}" rx="${s.brx}"
        fill="url(#liquid)" stroke="${glass}" stroke-width="3"/>
  <!-- glass sheen -->
  <rect x="${s.bx}" y="${s.by}" width="${s.bw}" height="${s.bh}" rx="${s.brx}" fill="url(#glassSheen)"/>
  <!-- highlight strip -->
  <rect x="${s.bx + 16}" y="${s.by + 20}" width="14" height="${s.bh - 60}" rx="7" fill="#ffffff" opacity="0.18"/>

  <!-- label -->
  <rect x="${300 - 70}" y="${s.by + s.bh / 2 - 42}" width="140" height="84" rx="6"
        fill="#0c0b09" opacity="0.55"/>
  <rect x="${300 - 70}" y="${s.by + s.bh / 2 - 42}" width="140" height="84" rx="6"
        fill="none" stroke="${accent}" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="300" y="${s.by + s.bh / 2 - 6}" text-anchor="middle"
        font-family="Georgia, 'Cormorant Garamond', serif" font-size="26" font-style="italic"
        fill="${accent}">${label}</text>
  <text x="300" y="${s.by + s.bh / 2 + 24}" text-anchor="middle"
        font-family="'DM Sans', Arial, sans-serif" font-size="10" letter-spacing="3"
        fill="${accent}" opacity="0.8">EAU DE PARFUM</text>
</svg>`
}

const files = {
  // designer
  'tf-oud-wood': bottle({ bg1: '#241c14', bg2: '#0c0b09', glass: '#3a2f22', liquid1: '#5a3d22', liquid2: '#2a1c10', cap: '#20160e', accent: '#e4cc7a', label: 'Oud Wood', shape: 'cube' }),
  'bleu': bottle({ bg1: '#0f1b2a', bg2: '#070b12', glass: '#24405c', liquid1: '#1c3a5e', liquid2: '#0b1826', cap: '#0a1420', accent: '#9fc3e8', label: 'Bleu', shape: 'cube' }),
  'sauvage': bottle({ bg1: '#1a2230', bg2: '#0a0d13', glass: '#33465c', liquid1: '#2b4258', liquid2: '#101b26', cap: '#c0c6cc', accent: '#cdd8e4', label: 'Sauvage', shape: 'classic' }),
  'eros': bottle({ bg1: '#0f2419', bg2: '#08120c', glass: '#1f5a3c', liquid1: '#1d7048', liquid2: '#0c2e1e', cap: '#d4af37', accent: '#8fe0b0', label: 'Eros', shape: 'classic' }),
  'la-nuit': bottle({ bg1: '#1a1622', bg2: '#0b0910', glass: '#3a3048', liquid1: '#2e2440', liquid2: '#130f1c', cap: '#151019', accent: '#c9b8e0', label: 'La Nuit', shape: 'tall' }),
  'acqua': bottle({ bg1: '#13202a', bg2: '#080d12', glass: '#2c4a5a', liquid1: '#2b5a6e', liquid2: '#0e222c', cap: '#e8edf0', accent: '#a8d4e0', label: 'Acqua', shape: 'tall' }),
  'le-male': bottle({ bg1: '#1f2630', bg2: '#0b0e12', glass: '#3a4652', liquid1: '#4a5866', liquid2: '#1a2028', cap: '#b8c0c8', accent: '#d0d8e0', label: 'Le Male', shape: 'flacon' }),
  'luna-rossa': bottle({ bg1: '#141a24', bg2: '#080b10', glass: '#2e3d52', liquid1: '#33506e', liquid2: '#111a26', cap: '#9aa4b0', accent: '#b8c8dc', label: 'Luna', shape: 'classic' }),

  // middle eastern (oud / amber / rose)
  'oud-greatness': bottle({ bg1: '#2a1e12', bg2: '#0c0906', glass: '#4a3620', liquid1: '#6e4a1e', liquid2: '#2e1e0c', cap: '#d4af37', accent: '#e4cc7a', label: 'Oud', shape: 'flacon' }),
  'interlude': bottle({ bg1: '#26170f', bg2: '#0a0705', glass: '#4a2e1c', liquid1: '#7a3e1c', liquid2: '#301808', cap: '#caa24a', accent: '#e8c98a', label: 'Interlude', shape: 'cube' }),
  'naxos': bottle({ bg1: '#2a2110', bg2: '#0c0905', glass: '#4e3c18', liquid1: '#8a6218', liquid2: '#3a2a0c', cap: '#e4cc7a', accent: '#f0dca0', label: 'Naxos', shape: 'classic' }),
  'black-afgano': bottle({ bg1: '#161310', bg2: '#080706', glass: '#2e2820', liquid1: '#2a2418', liquid2: '#100d0a', cap: '#1a1610', accent: '#c9a84c', label: 'Afgano', shape: 'tall' }),
  'oud-satin': bottle({ bg1: '#2a1420', bg2: '#0c060a', glass: '#4a1e34', liquid1: '#7a2848', liquid2: '#340f1e', cap: '#d4af37', accent: '#e8a0bc', label: 'Oud Satin', shape: 'flacon' }),
  'amber-aoud': bottle({ bg1: '#2e1e0e', bg2: '#0c0805', glass: '#5a3a16', liquid1: '#9a5e18', liquid2: '#3e2408', cap: '#e4cc7a', accent: '#f0d090', label: 'Amber Aoud', shape: 'cube' }),

  // minis
  'black-orchid': bottle({ bg1: '#1a1220', bg2: '#08050c', glass: '#3a2440', liquid1: '#2e1a38', liquid2: '#140b1a', cap: '#caa24a', accent: '#d0a8e0', label: 'Orchid', shape: 'flacon' }),
  'no5': bottle({ bg1: '#241a10', bg2: '#0c0805', glass: '#4a3820', liquid1: '#c99a4a', liquid2: '#7a5620', cap: '#1a1610', accent: '#f0dca0', label: 'N°5', shape: 'cube' }),
  'miss-dior': bottle({ bg1: '#2a1620', bg2: '#0c060a', glass: '#4a2436', liquid1: '#d47a92', liquid2: '#8a3e54', cap: '#d4af37', accent: '#f0b8c8', label: 'Miss Dior', shape: 'classic' }),
  'gypsy-water': bottle({ bg1: '#161f1a', bg2: '#080c0a', glass: '#2a4234', liquid1: '#3a6e50', liquid2: '#16281e', cap: '#c9b078', accent: '#a8d4bc', label: 'Gypsy', shape: 'tall' }),

  // accessories
  'atomizer': bottle({ bg1: '#1e1a14', bg2: '#0a0806', glass: '#3a3220', liquid1: '#5a4e2e', liquid2: '#2a2416', cap: '#d4af37', accent: '#e4cc7a', label: 'Travel', shape: 'tall' }),
  'display': bottle({ bg1: '#1c1710', bg2: '#0a0806', glass: '#3a2e1e', liquid1: '#6e5432', liquid2: '#2e2214', cap: '#8a6e42', accent: '#e0c48a', label: 'Display', shape: 'cube' }),
  'crystal-tray': bottle({ bg1: '#181818', bg2: '#080808', glass: '#3a3a3a', liquid1: '#8a8a8a', liquid2: '#3a3a3a', cap: '#d4af37', accent: '#e0e0e0', label: 'Crystal', shape: 'flacon' }),
}

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(outDir, `${name}.svg`), svg)
  console.log(`✓ ${name}.svg`)
}
console.log(`\nGenerated ${Object.keys(files).length} bottle illustrations.`)
