
export const validarLogin = (user, pass) => {
  if (user === "")
    return "User cannot be empty"
  if (pass === "")
    return "Password cannot be empty"
  return null
}

export const validarBookmark = (bookId, chapterIndex, fraction) => {
  if (typeof(bookId) !== 'number')
    return 'bookId must be a number'
  if (typeof(chapterIndex) !== 'number')
    return 'chapterIndex must be a number'
  if (typeof(fraction) !== 'number')
    return 'fraction must be a number'
  return null
}
