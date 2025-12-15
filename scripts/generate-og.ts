import path from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import sharp from 'sharp'

const ogTemplate = fs.readFileSync('scripts/og-template.svg', 'utf8')
const pagesDir = path.resolve('pages')
const outDir = 'public/og'

async function generate() {
  await fs.ensureDir(outDir)

  const files = await fg('**/*.md', {
    cwd: pagesDir,
    absolute: true,
  })

  for (const file of files) {
    const slug = path.basename(file, '.md')
    const out = path.join(outDir, `${slug}.png`)
    if (fs.existsSync(out))
      continue

    const { data } = matter(await fs.readFile(file, 'utf8'))
    if (!data.title)
      continue

    const lines = data.title.trim().split(/(.{0,30})(?:\s|$)/g).filter(Boolean)
    const svg = ogTemplate.replace(/\{\{([^}]+)\}\}/g, (_, key) =>
      lines[{ line1: 0, line2: 1, line3: 2 }[key] ?? ''] ?? '')

    console.log('Generate OG:', out)
    await sharp(Buffer.from(svg))
      .resize(1200, 630)
      .png()
      .toFile(out)
  }
}

generate()
