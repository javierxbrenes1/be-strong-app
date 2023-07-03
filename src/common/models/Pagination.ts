interface Pagination {
  nextPageStart: number;
  pageSize: number;
  total: number;
  totalPages: number;
  currentPage: number;
}

export default Pagination;
