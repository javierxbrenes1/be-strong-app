const homeSchema = `
 type DayCount {
   date: LocalDate!
   count: Int!
 }

 type HomeMemberRef {
   code: String!
   name: String!
 }

 type HomeSummary {
   activeMembers: Int!
   newMembersThisMonth: Int!
   attendancesThisWeek: Int!
   attendancesLastWeek: Int!
   last7Days: [DayCount!]!
   birthdays: [HomeMemberRef!]!
   atRisk: [HomeMemberRef!]!
   unmeasured: [HomeMemberRef!]!
 }

 extend type Query {
   getHomeSummary(today: LocalDate!): HomeSummary! @auth
 }
`;

export default homeSchema;
