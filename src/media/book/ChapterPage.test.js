import React from "react";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { BrowserRouter as Router, MemoryRouter, Route } from "react-router-dom";

import ChapterPage from "./ChapterPage.js";
import ChapterPageRoute from "./ChapterPageRoute.js";
import ChapterPageView from "./ChapterPageView.js";

jest.mock("../../server_data/PreloadedState", () => {
  return {
    bookIndex: [
    {
      "chapters": [
        "Capitulo 1",
        "Capitulo 2"
      ]
    }
  ],
  }
})
jest.mock("../../storage/storage.js");
jest.mock("../../dom/Scroll.js", () => {
  return {
    scrollByFraction: jest.fn()
  };
});

const mockedStorage = require("../../storage/storage.js");
const mockedScroll = require("../../dom/Scroll.js").scrollByFraction;

afterEach(() => {
  mockedScroll.mockClear();
  mockedStorage.__clear();
});

const mockSuccessfulResponse = response => {
  require("superagent").__execSuccess(response);
};

const newChapterPage = () => {
  return new ChapterPage(props);
};

const expectTreeToMatchSnapshot = component => {
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
};

it("Renders progress wheel until successful response is received", () => {
  const props = {
    getChapterByIndex: () => "Chapter 1",
    match: {
      params: {
        bookId: "0",
        chapterIndex: "0"
      }
    },
    location: {}
  };
  //initial
  const component = renderer.create(
    <Router>
      <ChapterPage {...props} />
    </Router>
  );
  expectTreeToMatchSnapshot(component);

  //after response
  const successfulResponse = {
    text: "This is the page content."
  };
  mockSuccessfulResponse(successfulResponse);
  expectTreeToMatchSnapshot(component);
});

it("scrolls to bookmark position after text is received if has bookmark in local storage and querystring has bookmark=1", () => {
  const props = {
    getChapterByIndex: () => "Chapter 1",
    match: {
      params: {
        bookId: "0",
        chapterIndex: "0"
      }
    },
    location: {
      search: "?bookmark=1"
    }
  };
  const component = renderer.create(
    <Router>
      <ChapterPage {...props} />
    </Router>
  );

  mockedStorage.addBookmark(0, 0, 0.5);
  //after response
  const successfulResponse = {
    text: "This is the page content."
  };
  mockSuccessfulResponse(successfulResponse);
  expect(mockedScroll.mock.calls).toEqual([[0.5]]);
});

it("does not scroll if querystring does not have bookmark=1", () => {
  const props = {
    getChapterByIndex: () => "Chapter 1",
    match: {
      params: {
        bookId: "0",
        chapterIndex: "0"
      }
    },
    location: {}
  };
  const component = renderer.create(
    <Router>
      <ChapterPage {...props} />
    </Router>
  );

  mockedStorage.addBookmark(0, 0, 0.5);
  //after response
  const successfulResponse = {
    text: "This is the page content."
  };
  mockSuccessfulResponse(successfulResponse);
  expect(mockedScroll.mock.calls).toEqual([]);
});

it("clears bookmark from state when moving to next page", () => {
  const component = renderer.create(
    <MemoryRouter initialEntries={["/book/0/0?bookmark=1"]}>
      <ChapterPageRoute />
    </MemoryRouter>
  );

  mockedStorage.addBookmark(0, 0, 0.5);
  //after response
  const successfulResponse = {
    text: "This is the page content."
  };
  mockSuccessfulResponse(successfulResponse);

  expect(component.toJSON()).toMatchSnapshot();
  expect(mockedScroll.mock.calls).toEqual([[0.5]]);

  //click next chapter button
  const linkComponent = component.toJSON().children[1];
  linkComponent.props.onClick({
    defaultPrevented: false,
    button: 0,
    preventDefault: () => {}
  });

  // after next chapter response
  const successful2ndResponse = {
    text: "This is the next page content."
  };
  mockSuccessfulResponse(successful2ndResponse);

  expect(component.toJSON()).toMatchSnapshot();
  //number of scrolls must remain the same
  expect(mockedScroll.mock.calls).toEqual([[0.5]]);
});
