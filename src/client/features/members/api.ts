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

export const AddMemberDocument = graphql(`
  mutation addMemberSheet($member: AddMemberInput) {
    addMember(member: $member) {
      code
      name
    }
  }
`);

export const UpdateMemberDocument = graphql(`
  mutation updateMemberSheet($member: UpdateMemberInput) {
    updateMember(member: $member) {
      code
      name
    }
  }
`);

export type MemberDetails = {
  code: string;
  name?: string | null;
  category?: string | null;
  genre?: string | null;
  birthDate?: string | null;
  height?: number | null;
  phone?: string | null;
  email?: string | null;
  observations?: string | null;
  isActive?: boolean | null;
  preferredClassTime?: number | null;
  memberAttendance?: Partial<Record<DayKey, boolean | null>> | null;
};

export type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
