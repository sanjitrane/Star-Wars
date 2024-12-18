import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../../components/UI/Input/Input';

describe('Input Component', () => {
  it('renders the input with default properties', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('input input');
    expect(inputElement).toHaveAttribute('placeholder', '');
  });

  it('renders the input with a placeholder', () => {
    const placeholderText = 'Enter your text';
    render(<Input placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', placeholderText);
  });

  it('calls the onChange handler when typing', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); 
  });

  it('applies custom styles when provided', () => {
    render(<Input styles="custom-class" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveClass('input custom-class');
  });

  it('forwards the ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('allows multiple instances to render independently', () => {
    render(
      <>
        <Input placeholder="First input" />
        <Input placeholder="Second input" />
      </>
    );
    const firstInput = screen.getByPlaceholderText('First input');
    const secondInput = screen.getByPlaceholderText('Second input');

    expect(firstInput).toBeInTheDocument();
    expect(secondInput).toBeInTheDocument();
  });

  it('supports typing into the input field', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'Typing test' } });
    expect(inputElement).toHaveValue('Typing test');
  });
});
