import React from 'react';
import { render, screen } from '@testing-library/react';
import { Shimmer } from '../../../components/UI/Shimmer/Shimmer';

describe('Shimmer Component', () => {
  it('renders default lines shimmer', () => {
    render(<Shimmer />);
    const shimmerElement = screen.getByTestId('shimmer');

    expect(shimmerElement).toBeInTheDocument();
    expect(shimmerElement).toHaveClass('shimmer');

    const lines = shimmerElement.querySelectorAll('.stroke');
    expect(lines).toHaveLength(2); // Default is 2 lines
    lines.forEach((line) => {
      expect(line).toHaveClass('animate');
      expect(line).toHaveClass('title');
    });
  });

  it('renders specified number of lines', () => {
    render(<Shimmer lines={5} />);
    const shimmerElement = screen.getByTestId('shimmer');
    const lines = shimmerElement.querySelectorAll('.stroke');
    expect(lines).toHaveLength(5);
  });

  it('renders image shimmer when type is "image"', () => {
    render(<Shimmer type="image" />);
    const shimmerElement = screen.getByTestId('shimmer');
    const imageCard = shimmerElement.querySelector('.image-card');
    
    expect(shimmerElement).toBeInTheDocument();
    expect(imageCard).toBeInTheDocument();
    expect(imageCard).toHaveClass('animate');
  });

  it('renders lines shimmer by default if type is invalid', () => {
    render(<Shimmer type={'invalid' as any} />);
    const shimmerElement = screen.getByTestId('shimmer');
    const lines = shimmerElement.querySelectorAll('.stroke');
    expect(lines).toHaveLength(2); // Falls back to the default of 2 lines
  });

  it('applies the correct wrapper structure', () => {
    render(<Shimmer />);
    const shimmerElement = screen.getByTestId('shimmer');
    const wrapper = shimmerElement.querySelector('.wrapper');
    expect(wrapper).toBeInTheDocument();
  });
});
