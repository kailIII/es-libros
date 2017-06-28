import React from 'react';
import renderer from 'react-test-renderer';
import ChapterPageView from './ChapterPageView.js';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

const assertViewMatchesSnapshot = (view) => {
  const component = renderer.create(view)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}

it('renders a normal chapter text without crashing', () => {
  const props = {
    pageData: {
      nextChapterUrl: '/book/0/2',
      text: 'This is a chapter.',
      title: 'Chapter 1',
    }
  }
  const view = <Router><ChapterPageView { ...props} /></Router>
  assertViewMatchesSnapshot(view)
});

it('renders a final chapter text without crashing', () => {
  const props = {
    pageData: {
      text: 'This is a chapter.',
      title: 'Chapter 1',
    }
  }
  const view = <ChapterPageView { ...props} />
  assertViewMatchesSnapshot(view)
});

it('renders a progress wheel if there is no page data', () => {
  const props = { }
  const view = <ChapterPageView { ...props} />
  assertViewMatchesSnapshot(view)
});
