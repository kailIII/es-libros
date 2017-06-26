const hasLocalStorage = typeof(Storage) !== "undefined"

export const addBookmark = (bookId, chapterIndex, fraction) => {
  if (typeof(bookId) !== 'number')
    throw Error('bookId must be a number')
  if (typeof(chapterIndex) !== 'number')
    throw Error('chapterIndex must be a number')
  if (typeof(fraction) !== 'number')
    throw Error('fraction must be a number')

  if (hasLocalStorage)
    localStorage[`bookmark${bookId}`] = JSON.stringify({bookId, chapterIndex, fraction})
  console.log(localStorage[`bookmark${bookId}`])
}

export const findBookmark = (bookId) => {
  if (hasLocalStorage) {
    const storedString = localStorage[`bookmark${bookId}`]
    if (storedString)
      return JSON.parse(storedString)
  }
}
