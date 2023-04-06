import { gql } from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const GET_ACTIVE_MEMBERS = gql`
  query getActiveMembers($offset: Int, $limit: Int, $ignore: [String]) {
    getAllMembers(offset: $offset, limit: $limit, ignore: $ignore) {
      members {
        avatar
        code
        name
      }
      pagination {
        nextPageStart
        pageSize
        total
        totalPages
      }
    }
  }
`;
