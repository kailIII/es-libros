import React from 'react';
import { Link } from 'react-router-dom'
import Bookmark from 'react-icons/lib/md/bookmark';
import Settings from 'react-icons/lib/md/settings';

import { computeScrollFraction } from '../dom/Scroll.js'
import { addBookmark } from '../storage/storage.js'

export const saveBookmark = (bookId, chapterIndex) => {
  if (!isNaN(bookId) && !isNaN(chapterIndex)) {
    const fraction = computeScrollFraction()
    addBookmark(bookId, chapterIndex, fraction)
    window.alert('Bookmark saved! If you close this tab, you will be able to resume reading from this position.')
  }
}

export const SaveBookmarkAction = (props) => {
  const {
    bookId,
    chapterIndex,
  } = props

  const bookIdNumber = parseInt(bookId, 10)
  const chapterIndexNumber = parseInt(chapterIndex, 10)
  return (
    <a className="navbar navbar-icon" onClick={ () => saveBookmark(bookIdNumber, chapterIndexNumber) }>
      <Bookmark />
    </a>
  )}

export const OpenSettingsAction = () => {
  return <Link className="navbar" to="/settings"><Settings /></Link>
}
