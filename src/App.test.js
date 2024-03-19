import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import TodoList from './features/todos/TodoList';

test('renders todo list', () => {
  render(<TodoList />);
  
  render(<TodoList />);
  
  const headingElement = screen.getAllByRole('heading', { name: /todo list/i })[0];
  expect(headingElement).toBeInTheDocument();

  const inputElement = screen.getByLabelText(/Add to list/i);
  expect(inputElement).toBeInTheDocument();

  // eslint-disable-next-line testing-library/no-node-access
  const submitButton = document.getElementsByClassName('submit')[0];
  expect(submitButton).toBeInTheDocument();
});


test('allows user to type in a new todo', () => {
  render(<TodoList />);

  const inputElement = screen.getByLabelText(/Add to list/i);
  fireEvent.change(inputElement, { target: { value: 'New Todo Item' } });
  expect(inputElement.value).toBe('New Todo Item');
});
