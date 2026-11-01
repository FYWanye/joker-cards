// One-off dev tool: fetch audio assets + ffmpeg binary (not shipped in app)
const https = require('https')
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const AUDIO_DIR = path.join(ROOT, 'src', 'common', 'audio')
const TOOLS_DIR = path.resolve(ROOT, '..', '.tools')

const KENNEY = 'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/'
const OGGS = [
  ['kenney_interfacesounds/Audio/click_001.ogg', 'click'],
  ['kenney_interfacesounds/Audio/confirmation_001.ogg', 'win'],
  ['kenney_interfacesounds/Audio/error_001.ogg', 'lose'],
  ['kenney_casinoaudio/Audio/cardSlide1.ogg', 'select'],
  ['kenney_casinoaudio/Audio/cardPlace1.ogg', 'play'],
  ['kenney_casinoaudio/Audio/cardShove1.ogg', 'discard'],
  ['kenney_casinoaudio/Audio/cardShuffle.ogg', 'shuffle'],
  ['kenney_casinoaudio/Audio/chipsStack1.ogg', 'chips'],
  ['kenney_casinoaudio/Audio/chipsHandle1.ogg', 'reward'],
]
const FF_URL = 'https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-win32-x64'

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 60000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        get(res.headers.location).then(resolve, reject)
        res.resume()
        return
      }
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
  fs.mkdirSync(AUDIO_DIR, { recursive: true })
  fs.mkdirSync(TOOLS_DIR, { recursive: true })
  let ok = 0
  for (const [src, name] of OGGS) {
    try {
      const buf = await get(KENNEY + src)
      fs.writeFileSync(path.join(AUDIO_DIR, name + '.ogg'), buf)
      ok++
      console.log('audio ok:', name, buf.length, 'bytes')
    } catch (e) {
      console.error('audio FAIL:', name, e.message)
    }
  }
  console.log('audio downloaded', ok + '/' + OGGS.length)
  try {
    const bin = await get(FF_URL)
    fs.writeFileSync(path.join(TOOLS_DIR, 'ff-tool.exe'), bin)
    console.log('ff-tool ok:', bin.length, 'bytes')
  } catch (e) {
    console.error('ff-tool FAIL:', e.message)
  }
}
main()
