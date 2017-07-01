import React from 'react';
import { Route } from 'react-router-dom'
import ChapterPage from './ChapterPage.js'

import { getChapterByIndex } from '../../server_data/PreloadedStateQueries.js'

const ChapterPageWrapper = (props) =>
  <ChapterPage getChapterByIndex={getChapterByIndex} {...props} />

const ChapterPageRoute = () =>
  <Route path="/book/:bookId/:chapterIndex" render={ChapterPageWrapper} />

export default ChapterPageRoute
