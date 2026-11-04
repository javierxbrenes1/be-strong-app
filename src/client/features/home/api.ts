import { graphql } from '../../gql';

export const HomeSummaryDocument = graphql(`
  query homeSummary($today: LocalDate!) {
    getHomeSummary(today: $today) {
      activeMembers
      newMembersThisMonth
      attendancesThisWeek
      attendancesLastWeek
      last7Days {
        date
        count
      }
      birthdays {
        code
        name
      }
      atRisk {
        code
        name
      }
      unmeasured {
        code
        name
      }
    }
  }
`);
