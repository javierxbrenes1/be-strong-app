import { graphql } from '../../gql';

export const ActiveMembersDocument = graphql(`
  query activeMembers($offset: Int, $limit: Int) {
    getAllMembers(offset: $offset, limit: $limit) {
      members {
        code
        name
        category
        isActive
        lastAttendanceDate
        currentWeight
      }
      pagination {
        total
        nextPageStart
      }
    }
  }
`);

export const InactiveMembersDocument = graphql(`
  query inactiveMembers($offset: Int, $limit: Int) {
    getAllInactiveMembers(offset: $offset, limit: $limit) {
      members {
        code
        name
        category
        isActive
        lastAttendanceDate
        currentWeight
      }
      pagination {
        total
        nextPageStart
      }
    }
  }
`);

export const SearchMembersDocument = graphql(`
  query searchMembers($filter: String) {
    getFilteredMembers(
      column: "name"
      comparator: "contains"
      filter: $filter
    ) {
      code
      name
      category
      isActive
      lastAttendanceDate
      currentWeight
    }
  }
`);
