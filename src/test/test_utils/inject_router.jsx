import { MemoryRouter } from 'react-router-dom';
import React from 'react';

export default (ComposedComponent, mockInitialPath) => {
  if (mockInitialPath) {
    return (
      <MemoryRouter
        initialEntries={[{ pathname: mockInitialPath, key: 'key' }]}
        initialIndex={0}
      >
        <ComposedComponent />
      </MemoryRouter>
    );
  }
  return <MemoryRouter><ComposedComponent /></MemoryRouter>;
};
