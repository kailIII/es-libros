import React from 'react';
import { Route } from 'react-router-dom'

import NavBar from './NavBar';
import ChapterPage from '../media/book/ChapterPage.js'
import ChapterList from '../media/book/ChapterList.js'
import LyricsPage from '../media/lyrics/LyricsPage.js'
import MediaList from '../media/MediaList.js'
import Login from '../login/Login.js'
import Settings from '../settings/Settings.js'
import SubmitFeedback from '../settings/SubmitFeedback.js'
import PreloadedState from '../server_data/PreloadedState'
import { getTitlePropsFromRoute } from './RouteTitleProps.js'
import { getChapterByIndex } from '../server_data/PreloadedStateQueries.js'

const ChapterPageWrapper = (props) => <ChapterPage getChapterByIndex={getChapterByIndex} {...props} />

export default class RouterNavBar extends React.Component {
  render() {
    const pathname = this.props.location.pathname
    const titleProps = getTitlePropsFromRoute(pathname)

    if (PreloadedState.needsLogin)
      return (
        <NavBar {...titleProps}>
          <Login />
        </NavBar>
      )

    return (
      <NavBar {...titleProps}>
        <Route exact path="/" component={MediaList} />
        <Route exact path="/book/:bookId" component={ChapterList} />
        <Route path="/book/:bookId/:chapterIndex" render={ChapterPageWrapper} />
        <Route path="/lyrics/:lyricsId" component={LyricsPage} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/feedback" component={SubmitFeedback} />
      </NavBar>
    )
  }
}
