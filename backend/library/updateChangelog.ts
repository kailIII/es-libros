import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process'

import SiteUpdate from '../db/SiteUpdate'

const EDITOR = process.env.EDITOR || 'vim'
const mediaPath = path.join(__dirname, '../media')
const changelogPath = path.join(mediaPath, 'changelog.json')
const msgInputFile = 'new_update.md'

const readChangelog = (): any => {
  try {
    const changelogString = fs.readFileSync(changelogPath, { encoding: 'utf8' })
    return JSON.parse(changelogString)
  } catch (err) {
    return []
  }
}

const deleteInputFile = () => {
  try {
    fs.unlinkSync(msgInputFile)
  } catch (err) {}
}

const readInputFile = (): string | null => {
  try {
    return fs.readFileSync(msgInputFile, { encoding: 'utf8' })
  } catch (err) {
  }
  return null
}

const changelog = readChangelog()
//Prompt editor to write update message
const editorProcess = spawn(EDITOR, [msgInputFile], { stdio: 'inherit' })
editorProcess.on('close', (exitCode) => {
    const inputMsg = readInputFile()
    deleteInputFile()
    if (exitCode !== 0 || !inputMsg) {
      console.error("Could not read update message")
      process.exit(1)
    } else if (inputMsg.length == 0) {
      console.error("Update aborted due to empty message")
      process.exit(1)
    } else {
      //Message successfully received update changelog
      const newUpdate = new SiteUpdate(Date.now(), inputMsg)
      const newChangelog = [ newUpdate, ...changelog ]

      fs.writeFileSync(changelogPath, JSON.stringify(newChangelog, null, 4))
    }
})
