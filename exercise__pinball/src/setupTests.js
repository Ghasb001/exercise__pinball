// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, getByText } from '@testing-library/react';
import Locations from './locations';

describe('rendering props tests', () => {
  test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

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
})