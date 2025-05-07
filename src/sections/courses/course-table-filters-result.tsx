import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import {
  chipProps,
  FiltersBlock,
  FiltersResult,
  FiltersResultProps,
} from 'src/components/filters-result';
import { ICourseTableFilters } from 'src/types/courses';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: UseSetStateReturn<ICourseTableFilters>;
};

export function CourseTableFiltersResult({ filters, onResetPage, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ teacher: 'all' });
  }, [onResetPage, updateFilters]);

  const handleRemoveRole = useCallback(
    (inputValue: string) => {
      onResetPage();
      updateFilters({ teacher: '' });
    },
    [onResetPage, updateFilters, currentFilters.teacher]
  );

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="المعلم:" isShow={currentFilters.teacher !== 'all'}>
        <Chip
          {...chipProps}
          label={currentFilters.teacher}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock label="البحث:" isShow={!!currentFilters.name}>
        <Chip {...chipProps} label={currentFilters.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
