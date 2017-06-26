import * as path from 'path'
import * as fs from 'fs'

const directoryTree = require('directory-tree')

const booksPath = path.join(__dirname, '../media/books')
const bookIndexPath = path.join(booksPath, 'index.json')

const readBookIndex = (): any => {
  try {
    const bookIndexString = fs.readFileSync(bookIndexPath, { encoding: 'utf8' })
    return JSON.parse(bookIndexString)
  } catch (err) {
    return []
  }
}

if (process.argv.length < 2) {
  console.error('Book directory is required as argument')
  process.exit(1)
}

const bookDir: string = process.argv[2]
const infoPath = path.join(bookDir, 'info.json')

//Parse book info and validate it
const bookInfoString = fs.readFileSync(infoPath, { encoding: 'utf8' })
const bookInfo = JSON.parse(bookInfoString)

if (!bookInfo.name) {
  console.error('info.json is missing "name" attribute')
  process.exit(1)
}

if (!bookInfo.author) {
  console.error('info.json is missing "author" attribute')
  process.exit(1)
}

if (!bookInfo.year) {
  console.error('info.json is missing "year" attribute')
  process.exit(1)
}

if (!bookInfo.chapters) {
  console.error('info.json is missing "chapters" attribute')
  process.exit(1)
}

const bookIndex = readBookIndex()
//create dir for new book
const newBookPosition = bookIndex.length
const newBookPath = path.join(booksPath, "" + newBookPosition)
fs.mkdirSync(newBookPath)

//search all markdown files (book pages and copy them to the new dir)
directoryTree(bookDir, { extensions: /\.md$/ }, (item) => {
  const input = item.path
  const output = path.join(newBookPath, item.name)
  //copy files
  fs.createReadStream(input).pipe(fs.createWriteStream(output));
})

//updateIndex
bookIndex.push(bookInfo)
fs.writeFileSync(bookIndexPath, JSON.stringify(bookIndex, null, 4))

console.log("successfully added new book at " + newBookPath)
