export type SortOption = 'score-desc' | 'score-asc' | 'date-desc' | 'date-asc' | 'name-desc' | 'name-asc';

const sortOptionLabels: Record<SortOption, string> = {
  'score-desc': 'Highest Score',
  'score-asc': 'Lowest Score',
  'date-desc': 'Newest First',
  'date-asc': 'Oldest First',
  'name-desc': 'Z to A',
  'name-asc': 'A to Z',
};

export const getSortOptionLabel = (option: SortOption): string => sortOptionLabels[option];