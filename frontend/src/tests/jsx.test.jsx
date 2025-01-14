import React from 'react';
import { render, screen } from '@testing-library/react';

test('simple JSX test', () => {
  render(<div>Hello, World!</div>);
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
});
