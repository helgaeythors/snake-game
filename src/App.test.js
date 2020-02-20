import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders snake element', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/snake/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders play button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/play/i);
  expect(linkElement).toBeInTheDocument();
});
