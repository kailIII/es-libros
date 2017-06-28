const hasLocalStorage = typeof(Storage) !== "undefined"

export const addBookmark = (bookId, chapterIndex, fraction) => {
  if (hasLocalStorage)
    localStorage[`bookmark${bookId}`] = JSON.stringify({bookId, chapterIndex, fraction})
}

export const findBookmark = (bookId) => {
  if (hasLocalStorage) {
    const storedString = localStorage[`bookmark${bookId}`]
    if (storedString)
      return JSON.parse(storedString)
  }
}
