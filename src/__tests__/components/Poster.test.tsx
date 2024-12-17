import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Poster } from '../../components/Poster/Poster';
import { Shimmer } from '../../components/UI/Shimmer/Shimmer';

jest.mock('../../components/UI/Shimmer/Shimmer', () => ({
  Shimmer: jest.fn(() => <div data-testid="shimmer">Loading...</div>),
}));

describe('Poster Component', () => {
  const posterProps = {
    source: 'https://example.com/image.jpg',
    alt: 'Example Poster',
    styles: 'custom-style',
  };

  it('renders the Shimmer component when the image is not loaded', () => {
    render(<Poster {...posterProps} />);

    // Check for the shimmer placeholder
    expect(screen.getByTestId('shimmer')).toBeInTheDocument();

    // Ensure the image is in the DOM but hidden (display:none)
    const imgElement = screen.getByAltText('Example Poster');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', posterProps.source);
    expect(imgElement).toHaveStyle('display: none');
  });

  it('displays the image after it is loaded', () => {
    render(<Poster {...posterProps} />);

    const imgElement = screen.getByAltText('Example Poster');
    expect(imgElement).toBeInTheDocument();

    // Simulate the onLoad event
    fireEvent.load(imgElement);

    // Shimmer should no longer be visible
    expect(screen.queryByTestId('shimmer')).not.toBeInTheDocument();

    // Image should be visible
    expect(imgElement).toHaveStyle('display: block');
  });

  it('applies custom styles to the image', () => {
    render(<Poster {...posterProps} />);

    const imgElement = screen.getByAltText('Example Poster');
    expect(imgElement).toHaveClass('custom-style');
  });

  it('renders with default alt text when alt is not provided', () => {
    render(<Poster source={posterProps.source} styles={posterProps.styles} alt="" />);

    const imgElement = screen.getByAltText('Episode Poster'); // Default alt text
    expect(imgElement).toBeInTheDocument();
  });
});
