import React from 'react';
import { render, screen } from '@testing-library/react';
import { Rating } from '../../components/Rating/Rating';
import { settings } from '../../utils/settings';

jest.mock('../../utils/settings', () => ({
  settings: {
    starFilled: '/filled-star.svg',
    starOutlined: '/outlined-star.svg',
  },
}));

describe('Rating Component', () => {
  it('renders number rating when showStars is false', () => {
    render(<Rating showStars={false} score={7.5} maxScore={10} />);
    const numberRating = screen.getByText('7.5 / 10');
    expect(numberRating).toBeInTheDocument();
  });

  it('renders star ratings when showStars is true', () => {
    render(<Rating showStars={true} score={4} maxScore={5} />);
    const filledStars = screen.getAllByAltText('Filled Star');
    const outlinedStars = screen.getAllByAltText('Outlined Star');

    expect(filledStars).toHaveLength(4);
    expect(outlinedStars).toHaveLength(1);
  });

  it('handles default values for score and maxScore', () => {
    render(<Rating showStars={false} score={undefined as any} maxScore={undefined as any} />);
    const defaultRating = screen.getByText('0 / 10');
    expect(defaultRating).toBeInTheDocument();
  });

  it('renders the correct number of stars based on score and maxScore', () => {
    render(<Rating showStars={true} score={3.7} maxScore={5} />);
    const filledStars = screen.getAllByAltText('Filled Star');
    const outlinedStars = screen.getAllByAltText('Outlined Star');

    expect(filledStars).toHaveLength(3);

    expect(outlinedStars).toHaveLength(2);
  });

  it('does not render stars when maxScore is 0', () => {
    render(<Rating showStars={true} score={3} maxScore={0} />);
    const stars = screen.queryAllByAltText(/Star/);
    expect(stars).toHaveLength(0);
  });

  it('renders correct alt text for stars', () => {
    render(<Rating showStars={true} score={2} maxScore={3} />);
    const filledStars = screen.getAllByAltText('Filled Star');
    const outlinedStars = screen.getAllByAltText('Outlined Star');

    filledStars.forEach((star) => {
      expect(star).toHaveAttribute('src', settings.starFilled);
    });

    outlinedStars.forEach((star) => {
      expect(star).toHaveAttribute('src', settings.starOutlined);
    });
  });
});
