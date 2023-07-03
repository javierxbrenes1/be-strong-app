import { gql } from '@apollo/client';

export const PAGINATION = gql`
  fragment pagination on Pagination {
    total
    pageSize
    nextPageStart
    totalPages
    currentPage
  }
`;
