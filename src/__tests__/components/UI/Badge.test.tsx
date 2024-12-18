import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../../components/UI/Badge/Badge';

describe('Badge Component', () => {
  it('renders the badge with default styles', () => {
    render(<Badge text="Default Badge" />);
    const badgeElement = screen.getByText('Default Badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('badge');
  });

  it('applies custom styles when provided', () => {
    render(<Badge text="Custom Badge" styles="custom-class" />);
    const badgeElement = screen.getByText('Custom Badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('badge custom-class');
  });

  it('displays the correct text', () => {
    render(<Badge text="Badge Text" />);
    const badgeElement = screen.getByText('Badge Text');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent('Badge Text');
  });

  it('renders multiple badges correctly', () => {
    render(
      <>
        <Badge text="Badge 1" />
        <Badge text="Badge 2" styles="highlight" />
      </>
    );
    const badge1 = screen.getByText('Badge 1');
    const badge2 = screen.getByText('Badge 2');

    expect(badge1).toBeInTheDocument();
    expect(badge1).toHaveClass('badge');
    expect(badge2).toBeInTheDocument();
    expect(badge2).toHaveClass('badge highlight');
  });
});
