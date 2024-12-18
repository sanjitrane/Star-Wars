import { sortData, generateArray, getYearFromDate, getFilteredList, getRatingObj } from '../../utils/helpers';
import { OMDBResponse } from '../../types';

describe('Utility Functions', () => {
  describe('sortData', () => {
    const data = [
      { id: 1, title: 'Star Wars', rating: 8.6 },
      { id: 2, title: 'A New Hope', rating: 9.0 },
      { id: 3, title: 'Empire Strikes Back', rating: 8.7 },
    ];

    it('sorts data in ascending order by string key', () => {
      const sorted = sortData('title', data, 'asc');
      expect(sorted.map(item => item.title)).toEqual(['A New Hope', 'Empire Strikes Back', 'Star Wars']);
    });

    it('sorts data in descending order by string key', () => {
      const sorted = sortData('title', data, 'desc');
      expect(sorted.map(item => item.title)).toEqual(['Star Wars', 'Empire Strikes Back', 'A New Hope']);
    });

    it('sorts data in ascending order by numeric key', () => {
      const sorted = sortData('rating', data, 'asc');
      expect(sorted.map(item => item.rating)).toEqual([8.6, 8.7, 9.0]);
    });

    it('sorts data in descending order by numeric key', () => {
      const sorted = sortData('rating', data, 'desc');
      expect(sorted.map(item => item.rating)).toEqual([9.0, 8.7, 8.6]);
    });

    it('handles sorting with an invalid key', () => {
      const sorted = sortData('nonexistentKey', data);
      expect(sorted).toEqual(data); // Original order should remain
    });
  });

  describe('generateArray', () => {
    const data = {
      'Star Wars': { episodeId: 1, imdbRating: '8.6' } as OMDBResponse,
      'A New Hope': { episodeId: 2, imdbRating: '9.0' } as OMDBResponse,
    };

    it('generates an array from the ratings data', () => {
      const result = generateArray(data);
      expect(result).toEqual([
        { episodeId: 1, imdbRating: '8.6' },
        { episodeId: 2, imdbRating: '9.0' },
      ]);
    });

    it('handles empty data', () => {
      const result = generateArray({});
      expect(result).toEqual([]);
    });
  });

  describe('getYearFromDate', () => {
    it('extracts the year from a valid date string', () => {
      expect(getYearFromDate('2024-01-01')).toBe(2024);
    });

    it('handles invalid date strings', () => {
      expect(getYearFromDate('InvalidDate')).toBeNaN();
    });

    it('handles empty date strings', () => {
      expect(getYearFromDate('')).toBeNaN();
    });
  });

  describe('getFilteredList', () => {
    const data = [
      { id: 1, title: 'Star Wars' },
      { id: 2, title: 'A New Hope' },
      { id: 3, title: 'Empire Strikes Back' },
    ];

    it('filters data based on a matching search term', () => {
      const result = getFilteredList(data, 'Star');
      expect(result).toEqual([{ id: 1, title: 'Star Wars' }]);
    });

    it('filters data case-insensitively', () => {
      const result = getFilteredList(data, 'star');
      expect(result).toEqual([{ id: 1, title: 'Star Wars' }]);
    });

    it('returns an empty array if no matches are found', () => {
      const result = getFilteredList(data, 'NotFound');
      expect(result).toEqual([]);
    });

    it('handles an empty search term', () => {
      const result = getFilteredList(data, '');
      expect(result).toEqual(data);
    });
  });

  describe('getRatingObj', () => {
    const data = {
      'Star Wars': { episodeId: 1, imdbRating: '8.6' } as OMDBResponse,
      'A New Hope': { episodeId: 2, imdbRating: '9.0' } as OMDBResponse,
    };

    it('returns the correct object based on a matching key and value', () => {
      const result = getRatingObj(data, 'episodeId', 1);
      expect(result).toEqual({ episodeId: 1, imdbRating: '8.6' });
    });

    it('returns null if no matching key and value are found', () => {
      const result = getRatingObj(data, 'episodeId', 99);
      expect(result).toBeNull();
    });

    it('handles empty data', () => {
      const result = getRatingObj({}, 'episodeId', 1);
      expect(result).toBeNull();
    });
  });
});
