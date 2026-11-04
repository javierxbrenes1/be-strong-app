import { graphql } from '../../gql';

export const MemberDetailDocument = graphql(`
  query memberDetail($code: String!) {
    getMember(code: $code) {
      code
      name
      genre
      birthDate
      height
      isActive
      phone
      email
      observations
      preferredClassTime
      category
      memberAttendance {
        memberCode
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }
      lastAttendanceDate
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
      memberMeasures(take: 6, orderBy: { date: "desc" }) {
        id
        date
        weight
        corporalFat
        muscle
        bodyMassIndex
        corporalWaterPct
        calories
      }
    }
  }
`);

export const MemberMeasuresDocument = graphql(`
  query memberMeasures($input: GetMeasuresInput) {
    getMeasures(input: $input) {
      measures {
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
      pagination {
        total
        pageSize
      }
    }
  }
`);

export const AttendanceByYearDocument = graphql(`
  query attendanceByYear($year: Int!, $memberCode: String!) {
    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {
      year
      month
      total
    }
  }
`);

export const AttendanceMonthDetailsDocument = graphql(`
  query attendanceMonthDetails(
    $year: Int!
    $month: Int!
    $memberCode: String!
  ) {
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

export const FirstAttendanceDocument = graphql(`
  query firstAttendance($memberCode: String!) {
    getMemberAttendanceClasses(memberCode: $memberCode, order: "asc", take: 1) {
      classDate
    }
  }
`);

export const AddMeasureDocument = graphql(`
  mutation addMeasureSheet($measure: AddMeasureInput) {
    addMeasure(measure: $measure) {
      id
    }
  }
`);

export const UpdateMeasureDocument = graphql(`
  mutation updateMeasureSheet($measure: UpdateMeasureInput) {
    updateMeasure(measure: $measure) {
      id
    }
  }
`);

export const DeleteMeasureDocument = graphql(`
  mutation deleteMeasureRow($id: Int!, $memberCode: String!) {
    deleteMeasure(id: $id, memberCode: $memberCode) {
      id
    }
  }
`);
