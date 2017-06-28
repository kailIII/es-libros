let bookmarks = { }

export const addBookmark = (bookId, chapterIndex, fraction) => {
  bookmarks[`bookmark${bookId}`] = {bookId, chapterIndex, fraction}
}

export const findBookmark = (bookId) => {
  return bookmarks[`bookmark${bookId}`]
}

export const __clear = () => { bookmarks = {} }
