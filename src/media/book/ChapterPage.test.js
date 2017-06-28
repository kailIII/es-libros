import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import ChapterPage from './ChapterPage.js'
import ChapterPageView from './ChapterPageView.js'

jest.mock('../../dom/Scroll.js')
jest.mock('../../storage/storage.js')

const mockedStorage = require('../../storage/storage.js')
const mockedScroll = require('../../dom/Scroll.js')

afterEach(() => {
  mockedScroll.__clear()
  mockedStorage.__clear()
})

const getLastScrolledFraction = () =>
  mockedScroll.__getLastScrolledFraction()

const mockSuccessfulResponse = (response) => {
  require('superagent').__execSuccess(response)
}

const newChapterPage = () => {
  return new ChapterPage(props)
}

const expectTreeToMatchSnapshot = (component) => {
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}

it('Renders progress wheel until successful response is received', () => {
  const props = {
    getChapterByIndex: () => "Chapter 1",
    match: {
      params: {
        bookId: "0",
        chapterIndex: "0",
      },
    },
    location: {
    },
  }
  //initial
  const component = renderer.create(<Router><ChapterPage { ...props } /></Router>)
  expectTreeToMatchSnapshot(component)

  //after response
  const successfulResponse = {
    text: 'This is the page content.'
  }
  mockSuccessfulResponse(successfulResponse)
  expectTreeToMatchSnapshot(component)
});

it('scrolls to bookmark position after text is received if has bookmark in local storage and querystring has bookmark=1', () => {
  const props = {
    getChapterByIndex: () => "Chapter 1",
    match: {
      params: {
        bookId: "0",
        chapterIndex: "0",
      },
    },
    location: {
      search: '?bookmark=1'
    },
  }
  const component = renderer.create(<Router><ChapterPage { ...props } /></Router>)

  mockedStorage.addBookmark(0, 0, 0.5)
  //after response
  const successfulResponse = {
    text: 'This is the page content.'
  }
  mockSuccessfulResponse(successfulResponse)
  expect(getLastScrolledFraction()).toEqual(0.5)
});

it('does not scroll if querystring does not have bookmark=1', () => {
  const props = {
    getChapterByIndex: () => "Chapter 1",
    match: {
      params: {
        bookId: "0",
        chapterIndex: "0",
      },
    },
    location: {
    },
  }
  const component = renderer.create(<Router><ChapterPage { ...props } /></Router>)

  mockedStorage.addBookmark(0, 0, 0.5)
  //after response
  const successfulResponse = {
    text: 'This is the page content.'
  }
  mockSuccessfulResponse(successfulResponse)
  expect(getLastScrolledFraction()).toEqual(undefined)
});
