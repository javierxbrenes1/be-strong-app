import { graphql } from '../../gql';

export const GymClassesByDayDocument = graphql(`
  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {
    getGymClasses(gte: $gte, lt: $lt) {
      id
      classDate
      classType
      classDurationInMinutes
      classDescription
      gymClassOnTimes {
        gymClassTime {
          id
          localTime
        }
      }
      attendanceList {
        gymClassTimeId
        members {
          code
          name
        }
      }
    }
  }
`);

export const AddMembersAttendancesDocument = graphql(`
  mutation addAttendances($input: MembersAttendancesInput!) {
    addMembersAttendances(input: $input) {
      id
    }
  }
`);

export const RemoveMembersAttendancesDocument = graphql(`
  mutation removeAttendances($input: MembersAttendancesInput!) {
    removeMembersAttendances(input: $input) {
      id
    }
  }
`);

export const AddGymClassDocument = graphql(`
  mutation addGymClassSheet($input: AddClassInput) {
    addGymClass(input: $input) {
      id
    }
  }
`);

export const AddTimesDocument = graphql(`
  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {
    addTimes(classId: $classId, timeIds: $timeIds) {
      id
    }
  }
`);
