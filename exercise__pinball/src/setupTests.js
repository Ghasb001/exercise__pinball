// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Locations from './locations';
import Coordinates from './coordinates';

describe('component testing', () => {
  // create a set of functions to handle the window alert error //
  let mainAlert;
  ////////////////////////////////////////////////////////////////
  beforeAll(() => {
    mainAlert = window.alert;
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = mainAlert;
  });
  ////////////////////////////////////////////////////////////////

  test('can render list from coordinates', () => {
    let fl = [{
      "id": 13230,
      "name": "41 Landing Bar and Grill",
      "street": "9211 South Florida Ave",
      "city": "Floral City",
      "state": "FL",
      "zip": "34436",
      "phone": "(352) 419-4176",
      "lat": "28.7289518",
      "lon": "-82.3044137",
      "website": "https://www.facebook.com/41landingbarandgrill",
    }]
    render(<Locations locations={fl} />)
    const florida = screen.getByText(/FL/i);
    expect(florida).toBeInTheDocument();
  });

  test('locations catches a null value and goes to fallback', () => {
    render(<Locations locations={[]} />);
    const loc = screen.getByTestId('nullLoc');
    expect(loc).not.toBe(null);
  });

  test('should set incoming data array submit', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} />);

    const latitudeInput = screen.getByTestId('latitude');
    const longitudeInput = screen.getByTestId('longitude');
    const submit = screen.getByText('Search');

    //valid coordinates (Bill Baggs State Park; great for fishing)
    fireEvent.change(latitudeInput, { target: { value: '25.673778570323815' } });
    fireEvent.change(longitudeInput, { target: { value: '-80.1586266254315.' } });

    // Submit the form
    fireEvent.click(submit);

    // Check if mocked functions were called correctly
    expect(nearMock).toHaveBeenCalledWith(expect.any(Array));
    expect(incomingMock).toHaveBeenCalledWith(true);
  });

  test('broken coordinates', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} />);

    const latitudeInput = screen.getByTestId('latitude');
    const longitudeInput = screen.getByTestId('longitude');
    const submit = screen.getByText('Search');

    //valid coordinates (Bill Baggs State Park; great for fishing)
    fireEvent.change(latitudeInput, { target: { value: 'ohnomycoordinates' } });
    fireEvent.change(longitudeInput, { target: { value: 'they\'rebroken' } });
    // break the form
    fireEvent.click(submit);
    // Check if functions were not called
    expect(incomingMock).toHaveBeenCalledTimes(0);
  });

})
