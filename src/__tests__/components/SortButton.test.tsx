import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortButton } from '../../components/SortButton/SortButton';

describe('SortButton Component', () => {
  const mockCallback = jest.fn();

  const mockConfig = [
    { name: 'Option 1', value: 'value1' },
    { name: 'Option 2', value: 'value2' },
    { name: 'Option 3', value: 'value3' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with the correct title', () => {
    render(<SortButton title="Sort By" childrenConfig={mockConfig} cb={mockCallback} />);
    const button = screen.getByRole('button', { name: 'Sort By' });
    expect(button).toBeInTheDocument();
  });

  it('toggles the dropdown on button click', () => {
    render(<SortButton title="Sort By" childrenConfig={mockConfig} cb={mockCallback} />);
    const button = screen.getByRole('button', { name: 'Sort By' });

    // Dropdown should not be visible initially
    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    // Click button to toggle dropdown
    fireEvent.click(button);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveTextContent('Option 1');
    expect(list).toHaveTextContent('Option 2');
    expect(list).toHaveTextContent('Option 3');

    // Click button again to close dropdown
    fireEvent.click(button);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('calls the callback function when an option is selected', () => {
    render(<SortButton title="Sort By" childrenConfig={mockConfig} cb={mockCallback} />);
    const button = screen.getByRole('button', { name: 'Sort By' });

    // Open dropdown
    fireEvent.click(button);

    // Select an option
    const option = screen.getByText('Option 2');
    fireEvent.click(option);

    // Ensure callback is called with the correct value
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('value2');

    // Dropdown should close after selection
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('closes the dropdown when clicking outside', () => {
    render(<SortButton title="Sort By" childrenConfig={mockConfig} cb={mockCallback} />);
    const button = screen.getByRole('button', { name: 'Sort By' });

    // Open dropdown
    fireEvent.click(button);
    expect(screen.getByRole('list')).toBeInTheDocument();

    // Simulate clicking outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('does not render the dropdown if childrenConfig is empty', () => {
    render(<SortButton title="Sort By" childrenConfig={[]} cb={mockCallback} />);
    const button = screen.getByRole('button', { name: 'Sort By' });

    // Open dropdown
    fireEvent.click(button);

    // Dropdown should not render
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
