import { gql } from '@apollo/client';

export const HOME_COUNTERS = gql`
  query homeQueries($year: Int, $today: Date) {
    getMembersCount
    getGymClassesCount(year: $year)
    getGymClasses(gte: $today) {
      id
      classDate
      classTime
      classType
    }
    getBirthdateMembers(date: $today) {
      code
      name
    }
  }
`;
