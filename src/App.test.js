import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title element', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/snake/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders play element', () => {
  const { getByText } = render(<App />);
  const playElement = getByText(/play/i);
  expect(playElement).toBeInTheDocument();
});
