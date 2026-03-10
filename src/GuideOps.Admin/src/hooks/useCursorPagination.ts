import { useState, useCallback } from 'react';

const DEFAULT_PAGE_SIZE = 10;

interface PaginationVariables {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export function useCursorPagination(initialPageSize = DEFAULT_PAGE_SIZE) {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [cursors, setCursors] = useState<{ after?: string; before?: string }>({});

  const variables: PaginationVariables = cursors.before
    ? { last: pageSize, before: cursors.before }
    : { first: pageSize, after: cursors.after };

  const goToNextPage = useCallback((endCursor: string | null) => {
    if (endCursor) {
      setCursors({ after: endCursor });
    }
  }, []);

  const goToPreviousPage = useCallback((startCursor: string | null) => {
    if (startCursor) {
      setCursors({ before: startCursor });
    }
  }, []);

  const resetPagination = useCallback(() => {
    setCursors({});
  }, []);

  const changePageSize = useCallback((size: number) => {
    setPageSize(size);
    setCursors({});
  }, []);

  return {
    variables,
    pageSize,
    goToNextPage,
    goToPreviousPage,
    resetPagination,
    changePageSize,
  };
}
