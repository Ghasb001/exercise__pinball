/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Locations from './locations';
import Coordinates from './coordinates';

describe('component testing', () => {
  test('renders list from coordinates', () => {
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

  let mainAlert;
  beforeAll(() => {
    mainAlert = window.alert;
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = mainAlert;
  });

  test('locations catches a null value and goes to fallback', () => {
    render(<Locations locations={[]} />);
    const loc = screen.getByTestId('nullLoc');
    expect(loc).not.toBe(null);
  });

  test('calls Near Me button', () => {
    render(<App />);
    const near = screen.getByText('Near Me');
    // clicks the button
    fireEvent.click(near);
    let hit = screen.getByText(/Locating/i);
    expect(hit).toBeInTheDocument();
  });

})


describe('coordinate testing', () => {

  // Bill Baggs State Park; great for fishing
  const billBaggs = {
    decLatitude: '25.673778570323815',
    decLongitude: '-80.1586266254315',
    cardinalLatitude: "25°40′25″N",
    cardinalLongitude: "80°09′34″W."
  }

  // create a set of functions to handle the window alert error //
  let mainAlert;
  beforeAll(() => {
    mainAlert = window.alert;
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = mainAlert;
  });
  ////////////////////////////////////////////////////////////////
  test('should set incoming data array onSubmit', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} />);

    const latitudeInput = screen.getByTestId('latitude');
    const longitudeInput = screen.getByTestId('longitude');
    const submit = screen.getByText('Search');

    //valid coordinates
    fireEvent.change(latitudeInput, { target: { value: billBaggs.decLatitude } });
    fireEvent.change(longitudeInput, { target: { value: billBaggs.decLongitude } });

    // Submit the form and assert
    fireEvent.click(submit);
    expect(nearMock).toHaveBeenCalledWith(expect.any(Array));
    expect(incomingMock).toHaveBeenCalledWith(true);
  });
  //////////////RESET ALERT//////////////
  beforeAll(() => {
    mainAlert = window.alert;
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = mainAlert;
  });

  test('should parse cardinal coordinates', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} />);

    const latitudeInput = screen.getByTestId('latitude');
    const longitudeInput = screen.getByTestId('longitude');
    const submit = screen.getByText('Search');

    //valid coordinates
    fireEvent.change(latitudeInput, { target: { value: billBaggs.cardinalLatitude } });
    fireEvent.change(longitudeInput, { target: { value: billBaggs.cardinalLongitude } });

    // Submit the form and assert
    fireEvent.click(submit);
    expect(nearMock).toHaveBeenCalledWith(expect.any(Array));
    expect(incomingMock).toHaveBeenCalledWith(true);
  });
  //////////////RESET ALERT//////////////
  beforeAll(() => {
    mainAlert = window.alert;
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = mainAlert;
  });

  test('broken coordinates', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} />);

    const latitudeInput = screen.getByTestId('latitude');
    const longitudeInput = screen.getByTestId('longitude');
    const submit = screen.getByText('Search');

    //valid coordinates (Bill Baggs State Park; great for fishing)
    fireEvent.change(latitudeInput, { target: { value: 'ohnomylocation' } });
    fireEvent.change(longitudeInput, { target: { value: 'it\'sbroken' } });
    // break the form
    fireEvent.click(submit);
    // Check that functions were not called
    expect(incomingMock).toHaveBeenCalledTimes(0);
  });

})