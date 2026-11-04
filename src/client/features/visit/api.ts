import { graphql } from '../../gql';

// desc + take 12 = las 12 más recientes; la página las invierte a cronológico.
export const VisitMemberDocument = graphql(`
  query visitMember($code: String!) {
    getVisitMember(code: $code) {
      name
      lastMeasure {
        id
        date
        weight
        weightDiff
        corporalFat
        corporalFatDiff
        muscle
        muscleDiff
        bodyMassIndex
        bodyMassIndexDiff
        corporalWaterPct
        corporalWaterPctDiff
        calories
        caloriesDiff
        muscleResult
        bodyMassIndexResult
        corporalFatResult
        corporalWaterPctResult
        caloriesResult
      }
      memberMeasures(take: 12, orderBy: { date: "desc" }) {
        id
        date
        weight
        bodyMassIndex
        corporalFat
        muscle
        corporalWaterPct
        calories
      }
    }
  }
`);

export const VisitAttendanceByYearDocument = graphql(`
  query visitAttendanceByYear($year: Int!, $memberCode: String!) {
    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {
      year
      month
      total
    }
  }
`);

export const VisitAttendanceMonthDocument = graphql(`
  query visitAttendanceMonth($year: Int!, $month: Int!, $memberCode: String!) {
    getMemberAttendanceLogsDetails(
      year: $year
      month: $month
      memberCode: $memberCode
    ) {
      classDate
      classDurationInMinutes
      classType
      localTime
    }
  }
`);
