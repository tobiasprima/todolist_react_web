import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('renders todo list', () => {
  render(<TodoList />);
  
  // Check if the heading "Todo List" is rendered
  const headingElement = screen.getByRole('heading', { name: /todo list/i });
  expect(headingElement).toBeInTheDocument();

  // Check if the input field for adding a new todo is rendered
  const inputElement = screen.getByLabelText(/Add to list/i);
  expect(inputElement).toBeInTheDocument();

  // Check if the submit button is rendered
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});

// You can add more tests to simulate user interaction as follows

test('allows user to type in a new todo', () => {
  render(<TodoList />);

  const inputElement = screen.getByLabelText(/Add to list/i);
  fireEvent.change(inputElement, { target: { value: 'New Todo Item' } });
  expect(inputElement.value).toBe('New Todo Item');
});
