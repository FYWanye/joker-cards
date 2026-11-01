// One-off asset fetcher (dev tool, not shipped in app)
const https = require('https')
const fs = require('fs')
const path = require('path')

const OUT = process.argv[2]
const BASE = 'https://raw.githubusercontent.com/hayeah/playing-cards-assets/master/png/'
const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
const suits = ['clubs', 'diamonds', 'hearts', 'spades']
const names = []
for (const r of ranks) for (const s of suits) names.push(`${r}_of_${s}.png`)
names.push('back.png', 'black_joker.png', 'red_joker.png')

fs.mkdirSync(OUT, { recursive: true })

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode !== 200) { reject(new Error(url + ' -> ' + res.statusCode)); res.resume(); return }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(new Error(url + ' timeout')) })
  })
}

async function main() {
  let ok = 0
  const failed = []
  for (const n of names) {
    try {
      const buf = await get(BASE + n)
      fs.writeFileSync(path.join(OUT, n), buf)
      ok++
    } catch (e) {
      failed.push(n + ': ' + e.message)
    }
  }
  console.log(`downloaded ${ok}/${names.length}`)
  if (failed.length) console.log('FAILED:\n' + failed.join('\n'))
}
main()
