import { render, screen, fireEvent, act } from '@testing-library/react';
import TodoList from './features/todos/TodoList';
import React from 'react';
import { store } from './app/store';
import { Provider } from 'react-redux';


test('renders todo list', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  
  const headingElement = screen.getByRole('heading', { name: /todo list/i });
  expect(headingElement).toBeInTheDocument();

  const inputElement = screen.getByLabelText(/Add to list/i);
  expect(inputElement).toBeInTheDocument();

  // eslint-disable-next-line testing-library/no-node-access
  const submitButton = document.getElementsByClassName('submit')[0];
  expect(submitButton).toBeInTheDocument();
});

test('allows user to type in a new todo', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>);

  const inputElement = screen.getByLabelText(/Add to list/i);
  act(() => {
    fireEvent.change(inputElement, { target: { value: 'New Todo Item' } });
  });
  expect(inputElement.value).toBe('New Todo Item');
});