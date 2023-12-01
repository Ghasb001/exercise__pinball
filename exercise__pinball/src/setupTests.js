// /**
//  * @jest-environment jsdom
//  */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Locations from './locations';
import Coordinates from './coordinates';

describe('location testing', () => {
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

  test('locations catches a null value and goes to fallback', () => {
    render(<Locations locations={[]} />);
    const loc = screen.getByTestId('nullLoc');
    expect(loc).not.toBe(null);
  });

  // create a set of functions to handle the window alert error //
  let mainAlert;
  beforeAll(() => {
    mainAlert = window.alert;
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = mainAlert;
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
    cardinalLongitude: "80°09′34″W"
  }



  test('should parse cardinal coordinates', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    const errMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} setErr={errMock} />);

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

  test('should alert and stop for broken coordinates', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    const errMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} setErr={errMock} />);

    const latitudeInput = screen.getByTestId('latitude');
    const longitudeInput = screen.getByTestId('longitude');
    const submit = screen.getByText('Search');

    fireEvent.change(latitudeInput, { target: { value: 'oh-no-my-location' } });
    fireEvent.change(longitudeInput, { target: { value: 'it\'s-broken' } });
    // break the form
    fireEvent.click(submit);
    // Check that functions were not called
    expect(incomingMock).toHaveBeenCalledTimes(0);
  });

  test('should alert and stop for missing coordinate', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    const errMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} setErr={errMock} />);

    const latitudeInput = screen.getByTestId('latitude');
    const longitudeInput = screen.getByTestId('longitude');
    const submit = screen.getByText('Search');

    fireEvent.change(latitudeInput, { target: { value: '25.1567° N' } });
    fireEvent.change(longitudeInput, { target: { value: '' } });
    // break the form
    fireEvent.click(submit);
    // Check that functions were not called
    expect(incomingMock).toHaveBeenCalledTimes(0);
  });

  test('should stop for nothing close by', () => {
    const nearMock = jest.fn();
    const incomingMock = jest.fn();
    const errMock = jest.fn();
    render(<Coordinates setNear={nearMock} setIncoming={incomingMock} setErr={errMock} />);

    const latitudeInput = screen.getByTestId('latitude');
    const longitudeInput = screen.getByTestId('longitude');
    const submit = screen.getByText('Search');

    fireEvent.change(latitudeInput, { target: { value: '0' } });
    fireEvent.change(longitudeInput, { target: { value: '0' } });
    // break the form
    fireEvent.click(submit);
    /* The function should be called once, since the coordinates are valid and pass the validator.
    It shouldn't render anything, as are no machines in Null Island, since it's in the middle of the ocean */
    expect(incomingMock).toHaveBeenCalledTimes(1);
    // since there was techincally an error, errMock had to have been called to handle the state
    expect(errMock).toHaveBeenCalledTimes(1);
  });

})