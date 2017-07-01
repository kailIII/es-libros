import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { readChapter, unauthorizedResponseHandler } from '../../api'
import { findBookmark } from '../../storage/storage.js'
import { scrollByFraction } from '../../dom/Scroll'
import ChapterPageView from './ChapterPageView.js'

import './ChapterPage.css'

class ChapterPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chapterText: '',
      bookmark: undefined,
    }
  }

  getNextChapterUrl = (bookId, i) => {
    const getChapterByIndex = this.props.getChapterByIndex
    const newIndex = parseInt(i, 10) + 1
    if (getChapterByIndex(bookId, newIndex))
      return `/book/${bookId}/${newIndex}`
  }

  pageWillChange = (nextProps) => {
    const {
      bookId,
      chapterIndex,
    } = this.props.match.params
    const {
      nextBookId,
      nextChapterIndex,
    } = nextProps.match.params

    return nextBookId !== bookId || nextChapterIndex !== chapterIndex
  }

  handleFetchChapterResponse = (props) => {
    return (resp) => {
      const bookId = props.match.params.bookId
      const search = props.location.search
      const chapterText = resp.text
      const nextState = { chapterText, bookmark: undefined }
      if (search && search.includes('bookmark=1')) {
        nextState.bookmark = findBookmark(bookId)
      }
      this.setState(nextState)
    }
  }

  fetchChapter = (props) => {
    const {
      bookId,
      chapterIndex,
    } = props.match.params

    readChapter(bookId, chapterIndex)
      .send()
      .then(this.handleFetchChapterResponse(props), unauthorizedResponseHandler())
  }

  mapStateToViewProps = () => {
    const {
      getChapterByIndex,
      match,
    } = this.props

    const {
      bookId,
      chapterIndex,
    } = match.params

    const chapterText = this.state.chapterText
    if (chapterText === '')
      return undefined
    else {
      return {
        nextChapterUrl: this.getNextChapterUrl(bookId, chapterIndex),
        text: chapterText,
        title: getChapterByIndex(bookId, chapterIndex)
      }
    }
  }

  scrollToBookmarkPosition = (prevChapterText) => {
    const {
          chapterText,
          bookmark,
        } = this.state
    const didDownloadText = prevChapterText === ""
                            && chapterText !== prevChapterText
                            && bookmark

    if (didDownloadText)
      scrollByFraction(bookmark.fraction)
  }

  fetchChapterIfPageWillChange = (nextProps) => {
    if (this.pageWillChange(nextProps)) {
      this.setState({chapterText: ""})
      this.fetchChapter(nextProps)
    }
  }

  render() {
    const pageData = this.mapStateToViewProps()
    return <ChapterPageView pageData={pageData} />
  }

  componentWillReceiveProps(nextProps) {
    this.fetchChapterIfPageWillChange(nextProps)
  }

  componentDidMount() {
    this.fetchChapter(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBookmarkPosition(prevState.chapterText)
  }
}

ChapterPage.propTypes = {
  getChapterByIndex: PropTypes.func.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
}

export default ChapterPage;
