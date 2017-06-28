import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import markdownToComponentArray from '../../markdown'
import ProgressWheel from '../../comp/ProgressWheel'

const NextChapterButton = (props) => {
  const nextChapterUrl  = props.nextChapterUrl
  if (nextChapterUrl)
    return (
      <Link className="next-chapter" to={nextChapterUrl}>
        Siguiente Capitulo
      </Link>
    )
  return null
}

const ChapterPageContent = (props) => {
  const {
      text,
      title,
      nextChapterUrl,
    } = props

    return (
      <div>
        <div className="container-markdown">
          <h2 className="book-markdown">{title}</h2>
          { markdownToComponentArray(text, 'book-markdown') }
        </div>
        <NextChapterButton nextChapterUrl={nextChapterUrl} />
      </div>
    )
}

export default class ChapterPageView extends Component {

  render() {
    const {
      pageData
    } = this.props

    if (pageData)
      return <ChapterPageContent {...pageData} />
    else
      return <ProgressWheel />
  }
}

ChapterPageView.propTypes = {
  pageData: PropTypes.shape({
    nextChapterUrl: PropTypes.string,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })
}
