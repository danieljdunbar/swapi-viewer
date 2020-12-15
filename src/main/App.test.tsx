import React from 'react';
import { act } from "@testing-library/react";
import { SwapiResponse, DEFAULT_PERSON } from '../common/common_interfaces';
import { IProps as MockProps } from '../list-people/ListPeople';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

jest.mock('../list-people/ListPeople', () => (props: MockProps) =>
  (
    <div data-testid="listPeople">
      <div data-testid="isLoaded">isLoaded: {props.isLoaded.toString()}</div>
      <div data-testid="people">people: {props.people.length.toString()}</div>
    </div>
  )
);

describe('App', () => {
  const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';
  const PEOPLE_URL_1 = 'mysterygang.com/page1';
  const PEOPLE_URL_2 = 'mysterygang.com/page2';
  const PEOPLE_RESPONSE_1: SwapiResponse = {
    count: 6,
    next: PEOPLE_URL_2,
    previous: null,
    results: [DEFAULT_PERSON],
  };
  const PEOPLE_RESPONSE_2: SwapiResponse = {
    count: 6,
    next: null,
    previous: PEOPLE_URL_1,
    results: [DEFAULT_PERSON, DEFAULT_PERSON],
  };

  beforeEach(() => {
    console.log('test start');
    fetchMock.resetMocks();
  });

  it("keeps buttons disabled while loading", async () => {
    let promiseResolve;

    act(() => {
      render(<App />);
      fetchMock.mockResponseOnce(
        () =>
          new Promise(resolve => promiseResolve = resolve)
      )
    });

    assertPage(false, 0, true, true);
  });

  it("shows error page when an error occurs", async () => {
    const errorMessage = 'Ruh roh raggy';
    act(() => {
      render(<App />);
      fetchMock.mockReject(new Error(errorMessage));
    });

    await waitFor(() => expect(screen.getByText('Error: ' + errorMessage)).toBeVisible());
  });

  describe('data finishes loading', () => {
    beforeEach(() => {
      act(() => {
        render(<App />);
        fetchMock.once(JSON.stringify(PEOPLE_RESPONSE_1))
          .once(JSON.stringify(PEOPLE_RESPONSE_2))
          .once(JSON.stringify(PEOPLE_RESPONSE_1));
      });
    });

    it("Next and Previous buttons page between results", async () => {
      let buttons = screen.getAllByRole('button');
      assertPage(true, 1, true, false);

      fireEvent.click(buttons[1]);
      await waitFor(() => expect(screen.getByTestId('people')).toHaveTextContent('people: 2'));

      buttons = screen.getAllByRole('button');
      assertPage(true, 2, false, true);

      fireEvent.click(buttons[0]);
      await waitFor(() => expect(screen.getByTestId('people')).toHaveTextContent('people: 1'));
      assertPage(true, 1, true, false);
    });
  });

  function assertPage(
    isLoaded: boolean,
    personCount: number,
    previousDisabled: boolean,
    nextDisabled: boolean) {
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('Previous');
    expect(buttons[1]).toHaveTextContent('Next');
    if (previousDisabled) {
      expect(buttons[0]).toHaveAttribute('disabled');
    }
    if (nextDisabled) {
      expect(buttons[1]).toHaveAttribute('disabled');
    }
    expect(screen.getByTestId('isLoaded')).toHaveTextContent('isLoaded: ' + isLoaded);
    expect(screen.getByTestId('people')).toHaveTextContent('people: ' + personCount);
  }
});
