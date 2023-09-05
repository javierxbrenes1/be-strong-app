import { gql } from '@apollo/client';

export const HOME_QUERY = gql`
  query homeQueries($year: Int, $today: String!) {
    getMembersCount
    getGymClassesCount(year: $year)
    getGymClasses(gte: $today) {
      id
      classType
    }
    getBirthdateMembers(date: $today) {
      code
      name
    }
  }
`;
