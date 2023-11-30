import { render, screen } from '@testing-library/react';
import App from './App';
import Coordinates from './coordinates';
import Locations from './locations';

describe('App render tests', () => {

  test('renders the main page', () => {
    render(<App />);
    const nearButton = screen.getByText(/Near Me/i);
    expect(nearButton).toBeInTheDocument();
  });

  test('renders the coordinates form', () => {
    render(<Coordinates latitude={null} longitude={null}/>);
    const searchButton = screen.getByText(/Search/i);
    expect(searchButton).toBeInTheDocument();
  });

  test('renders the locations component', () => {
    // render(<Locations locations={[]} />);
    render(<Locations locations={[]} />);
    const loc = screen.getByTestId('locations');
    expect(loc).not.toBe(null);
  });

})
