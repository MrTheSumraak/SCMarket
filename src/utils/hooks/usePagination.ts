import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], initialPageSize = 20) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Элементы для текущей страницы
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  // Всего страниц
  const totalItems = items.length;

  // Функция для смены страницы
  const onChangePage = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  return {
    currentPage,
    pageSize,
    paginatedItems,
    totalItems,
    onChangePage,
    setPageSize,
    setCurrentPage
  };
}
