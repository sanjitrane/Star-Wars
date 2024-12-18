import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../../components/UI/Button/Button';

describe('Button Component', () => {
  it('renders the button with default properties', () => {
    render(<Button>Default Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /default button/i });
    
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'button');
    expect(buttonElement).not.toBeDisabled();
    expect(buttonElement).toHaveClass('btn');
  });

  it('renders the button with a custom type', () => {
    render(<Button type="submit">Submit Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /submit button/i });
    
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call the onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled={true}>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled button/i });

    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom styles when provided', () => {
    render(<Button styles="custom-class">Styled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /styled button/i });

    expect(buttonElement).toHaveClass('btn custom-class');
  });

  it('renders with the correct children', () => {
    render(<Button><span>Child Element</span></Button>);
    const childElement = screen.getByText(/child element/i);

    expect(childElement).toBeInTheDocument();
  });

  it('renders multiple buttons independently', () => {
    render(
      <>
        <Button>Button 1</Button>
        <Button type="submit" styles="highlight">Button 2</Button>
      </>
    );
    const button1 = screen.getByRole('button', { name: /button 1/i });
    const button2 = screen.getByRole('button', { name: /button 2/i });

    expect(button1).toBeInTheDocument();
    expect(button1).toHaveAttribute('type', 'button');
    expect(button1).toHaveClass('btn');

    expect(button2).toBeInTheDocument();
    expect(button2).toHaveAttribute('type', 'submit');
    expect(button2).toHaveClass('btn highlight');
  });
});
