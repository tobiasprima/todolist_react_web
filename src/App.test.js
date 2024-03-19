import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './features/todos/TodoList';

test('renders todo list', () => {
  render(<TodoList />);
  
  const headingElement = screen.getByRole('heading', { name: /todo list/i });
  expect(headingElement).toBeInTheDocument();

  const inputElement = screen.getByLabelText(/Add to list/i);
  expect(inputElement).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});


test('allows user to type in a new todo', () => {
  render(<TodoList />);

  const inputElement = screen.getByLabelText(/Add to list/i);
  fireEvent.change(inputElement, { target: { value: 'New Todo Item' } });
  expect(inputElement.value).toBe('New Todo Item');
});
