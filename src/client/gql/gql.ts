/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation login($input: OwnerSignInInput) {\n    ownerSignIn(input: $input) {\n      jwt\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation updatePwd($currentPwd: String!, $pwd: String!) {\n    updatePwd(currentPwd: $currentPwd, pwd: $pwd)\n  }\n": typeof types.UpdatePwdDocument,
    "\n  query whoAmIProfile {\n    whoAmI {\n      username\n      name\n      email\n      role\n      lastPasswordChangeDate\n    }\n  }\n": typeof types.WhoAmIProfileDocument,
    "\n  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {\n    getGymClasses(gte: $gte, lt: $lt) {\n      id\n      classDate\n      classType\n      classDurationInMinutes\n      classDescription\n      gymClassOnTimes {\n        gymClassTime {\n          id\n          localTime\n        }\n      }\n      attendanceList {\n        gymClassTimeId\n        members {\n          code\n          name\n        }\n      }\n    }\n  }\n": typeof types.GymClassesByDayDocument,
    "\n  mutation addAttendances($input: MembersAttendancesInput!) {\n    addMembersAttendances(input: $input) {\n      id\n    }\n  }\n": typeof types.AddAttendancesDocument,
    "\n  mutation removeAttendances($input: MembersAttendancesInput!) {\n    removeMembersAttendances(input: $input) {\n      id\n    }\n  }\n": typeof types.RemoveAttendancesDocument,
    "\n  mutation addGymClassSheet($input: AddClassInput) {\n    addGymClass(input: $input) {\n      id\n    }\n  }\n": typeof types.AddGymClassSheetDocument,
    "\n  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {\n    addTimes(classId: $classId, timeIds: $timeIds) {\n      id\n    }\n  }\n": typeof types.AddTimesDialogDocument,
    "\n  query gymClassTypes {\n    getGymClassTypes\n  }\n": typeof types.GymClassTypesDocument,
    "\n  query gymClassTimes {\n    allGymClassTimes {\n      id\n      localTime\n    }\n  }\n": typeof types.GymClassTimesDocument,
    "\n  mutation addGymClassTimeConfig($localTime: LocalTime!) {\n    addGymClassTime(localTime: $localTime) {\n      id\n      localTime\n    }\n  }\n": typeof types.AddGymClassTimeConfigDocument,
    "\n  query EquipmentCategories {\n    getEquipmentCategories {\n      uuid\n      name\n      equipment {\n        uuid\n        description\n        brand\n        total\n      }\n    }\n  }\n": typeof types.EquipmentCategoriesDocument,
    "\n  mutation AddEquipmentCategory(\n    $name: String!\n    $equipment: [UpsertEquipmentInput]\n  ) {\n    addEquipmentCategory(name: $name, equipment: $equipment) {\n      uuid\n      name\n    }\n  }\n": typeof types.AddEquipmentCategoryDocument,
    "\n  mutation UpdateEquipmentCategoryName($uuid: UUID!, $name: String!) {\n    updateEquipmentCategoryName(uuid: $uuid, name: $name) {\n      uuid\n      name\n    }\n  }\n": typeof types.UpdateEquipmentCategoryNameDocument,
    "\n  mutation UpsertEquipment($input: UpsertEquipmentInput!) {\n    upsertEquipment(input: $input) {\n      uuid\n      description\n      brand\n      total\n    }\n  }\n": typeof types.UpsertEquipmentDocument,
    "\n  mutation DeleteEquipment($equipmentUuid: UUID!) {\n    deleteEquipment(equipmentUuid: $equipmentUuid) {\n      uuid\n    }\n  }\n": typeof types.DeleteEquipmentDocument,
    "\n  mutation DeleteEquipmentCategory($categoryUuid: UUID!) {\n    deleteEquipmentCategory(categoryUuid: $categoryUuid) {\n      uuid\n      name\n    }\n  }\n": typeof types.DeleteEquipmentCategoryDocument,
    "\n  query homeSummary($today: LocalDate!) {\n    getHomeSummary(today: $today) {\n      activeMembers\n      newMembersThisMonth\n      attendancesThisWeek\n      attendancesLastWeek\n      last7Days {\n        date\n        count\n      }\n      birthdays {\n        code\n        name\n      }\n      atRisk {\n        code\n        name\n      }\n      unmeasured {\n        code\n        name\n      }\n    }\n  }\n": typeof types.HomeSummaryDocument,
    "\n  query memberDetail($code: String!) {\n    getMember(code: $code) {\n      code\n      name\n      genre\n      birthDate\n      height\n      isActive\n      phone\n      email\n      observations\n      preferredClassTime\n      category\n      memberAttendance {\n        memberCode\n        monday\n        tuesday\n        wednesday\n        thursday\n        friday\n        saturday\n        sunday\n      }\n      lastAttendanceDate\n      lastMeasure {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      memberMeasures(take: 6, orderBy: { date: \"desc\" }) {\n        id\n        date\n        weight\n        corporalFat\n        muscle\n        bodyMassIndex\n        corporalWaterPct\n        calories\n      }\n    }\n  }\n": typeof types.MemberDetailDocument,
    "\n  query memberMeasures($input: GetMeasuresInput) {\n    getMeasures(input: $input) {\n      measures {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      pagination {\n        total\n        pageSize\n      }\n    }\n  }\n": typeof types.MemberMeasuresDocument,
    "\n  query attendanceByYear($year: Int!, $memberCode: String!) {\n    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {\n      year\n      month\n      total\n    }\n  }\n": typeof types.AttendanceByYearDocument,
    "\n  query attendanceMonthDetails(\n    $year: Int!\n    $month: Int!\n    $memberCode: String!\n  ) {\n    getMemberAttendanceLogsDetails(\n      year: $year\n      month: $month\n      memberCode: $memberCode\n    ) {\n      classDate\n      classDurationInMinutes\n      classType\n      localTime\n    }\n  }\n": typeof types.AttendanceMonthDetailsDocument,
    "\n  query firstAttendance($memberCode: String!) {\n    getMemberAttendanceClasses(memberCode: $memberCode, order: \"asc\", take: 1) {\n      classDate\n    }\n  }\n": typeof types.FirstAttendanceDocument,
    "\n  mutation addMeasureSheet($measure: AddMeasureInput) {\n    addMeasure(measure: $measure) {\n      id\n    }\n  }\n": typeof types.AddMeasureSheetDocument,
    "\n  mutation updateMeasureSheet($measure: UpdateMeasureInput) {\n    updateMeasure(measure: $measure) {\n      id\n    }\n  }\n": typeof types.UpdateMeasureSheetDocument,
    "\n  mutation deleteMeasureRow($id: Int!, $memberCode: String!) {\n    deleteMeasure(id: $id, memberCode: $memberCode) {\n      id\n    }\n  }\n": typeof types.DeleteMeasureRowDocument,
    "\n  query activeMembers($offset: Int, $limit: Int) {\n    getAllMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n        memberAttendance {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n        }\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n": typeof types.ActiveMembersDocument,
    "\n  query inactiveMembers($offset: Int, $limit: Int) {\n    getAllInactiveMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n": typeof types.InactiveMembersDocument,
    "\n  query searchMembers($filter: String) {\n    getFilteredMembers(\n      column: \"name\"\n      comparator: \"contains\"\n      filter: $filter\n    ) {\n      code\n      name\n      category\n      isActive\n      lastAttendanceDate\n      currentWeight\n    }\n  }\n": typeof types.SearchMembersDocument,
    "\n  mutation addMemberSheet($member: AddMemberInput) {\n    addMember(member: $member) {\n      code\n      name\n    }\n  }\n": typeof types.AddMemberSheetDocument,
    "\n  mutation updateMemberSheet($member: UpdateMemberInput) {\n    updateMember(member: $member) {\n      code\n      name\n    }\n  }\n": typeof types.UpdateMemberSheetDocument,
    "\n  query visitMember($code: String!) {\n    getVisitMember(code: $code) {\n      name\n      lastMeasure {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      memberMeasures(take: 12, orderBy: { date: \"desc\" }) {\n        id\n        date\n        weight\n        bodyMassIndex\n        corporalFat\n        muscle\n        corporalWaterPct\n        calories\n      }\n    }\n  }\n": typeof types.VisitMemberDocument,
    "\n  query visitAttendanceByYear($year: Int!, $memberCode: String!) {\n    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {\n      year\n      month\n      total\n    }\n  }\n": typeof types.VisitAttendanceByYearDocument,
    "\n  query visitAttendanceMonth($year: Int!, $month: Int!, $memberCode: String!) {\n    getMemberAttendanceLogsDetails(\n      year: $year\n      month: $month\n      memberCode: $memberCode\n    ) {\n      classDate\n      classDurationInMinutes\n      classType\n      localTime\n    }\n  }\n": typeof types.VisitAttendanceMonthDocument,
};
const documents: Documents = {
    "\n  mutation login($input: OwnerSignInInput) {\n    ownerSignIn(input: $input) {\n      jwt\n    }\n  }\n": types.LoginDocument,
    "\n  mutation updatePwd($currentPwd: String!, $pwd: String!) {\n    updatePwd(currentPwd: $currentPwd, pwd: $pwd)\n  }\n": types.UpdatePwdDocument,
    "\n  query whoAmIProfile {\n    whoAmI {\n      username\n      name\n      email\n      role\n      lastPasswordChangeDate\n    }\n  }\n": types.WhoAmIProfileDocument,
    "\n  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {\n    getGymClasses(gte: $gte, lt: $lt) {\n      id\n      classDate\n      classType\n      classDurationInMinutes\n      classDescription\n      gymClassOnTimes {\n        gymClassTime {\n          id\n          localTime\n        }\n      }\n      attendanceList {\n        gymClassTimeId\n        members {\n          code\n          name\n        }\n      }\n    }\n  }\n": types.GymClassesByDayDocument,
    "\n  mutation addAttendances($input: MembersAttendancesInput!) {\n    addMembersAttendances(input: $input) {\n      id\n    }\n  }\n": types.AddAttendancesDocument,
    "\n  mutation removeAttendances($input: MembersAttendancesInput!) {\n    removeMembersAttendances(input: $input) {\n      id\n    }\n  }\n": types.RemoveAttendancesDocument,
    "\n  mutation addGymClassSheet($input: AddClassInput) {\n    addGymClass(input: $input) {\n      id\n    }\n  }\n": types.AddGymClassSheetDocument,
    "\n  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {\n    addTimes(classId: $classId, timeIds: $timeIds) {\n      id\n    }\n  }\n": types.AddTimesDialogDocument,
    "\n  query gymClassTypes {\n    getGymClassTypes\n  }\n": types.GymClassTypesDocument,
    "\n  query gymClassTimes {\n    allGymClassTimes {\n      id\n      localTime\n    }\n  }\n": types.GymClassTimesDocument,
    "\n  mutation addGymClassTimeConfig($localTime: LocalTime!) {\n    addGymClassTime(localTime: $localTime) {\n      id\n      localTime\n    }\n  }\n": types.AddGymClassTimeConfigDocument,
    "\n  query EquipmentCategories {\n    getEquipmentCategories {\n      uuid\n      name\n      equipment {\n        uuid\n        description\n        brand\n        total\n      }\n    }\n  }\n": types.EquipmentCategoriesDocument,
    "\n  mutation AddEquipmentCategory(\n    $name: String!\n    $equipment: [UpsertEquipmentInput]\n  ) {\n    addEquipmentCategory(name: $name, equipment: $equipment) {\n      uuid\n      name\n    }\n  }\n": types.AddEquipmentCategoryDocument,
    "\n  mutation UpdateEquipmentCategoryName($uuid: UUID!, $name: String!) {\n    updateEquipmentCategoryName(uuid: $uuid, name: $name) {\n      uuid\n      name\n    }\n  }\n": types.UpdateEquipmentCategoryNameDocument,
    "\n  mutation UpsertEquipment($input: UpsertEquipmentInput!) {\n    upsertEquipment(input: $input) {\n      uuid\n      description\n      brand\n      total\n    }\n  }\n": types.UpsertEquipmentDocument,
    "\n  mutation DeleteEquipment($equipmentUuid: UUID!) {\n    deleteEquipment(equipmentUuid: $equipmentUuid) {\n      uuid\n    }\n  }\n": types.DeleteEquipmentDocument,
    "\n  mutation DeleteEquipmentCategory($categoryUuid: UUID!) {\n    deleteEquipmentCategory(categoryUuid: $categoryUuid) {\n      uuid\n      name\n    }\n  }\n": types.DeleteEquipmentCategoryDocument,
    "\n  query homeSummary($today: LocalDate!) {\n    getHomeSummary(today: $today) {\n      activeMembers\n      newMembersThisMonth\n      attendancesThisWeek\n      attendancesLastWeek\n      last7Days {\n        date\n        count\n      }\n      birthdays {\n        code\n        name\n      }\n      atRisk {\n        code\n        name\n      }\n      unmeasured {\n        code\n        name\n      }\n    }\n  }\n": types.HomeSummaryDocument,
    "\n  query memberDetail($code: String!) {\n    getMember(code: $code) {\n      code\n      name\n      genre\n      birthDate\n      height\n      isActive\n      phone\n      email\n      observations\n      preferredClassTime\n      category\n      memberAttendance {\n        memberCode\n        monday\n        tuesday\n        wednesday\n        thursday\n        friday\n        saturday\n        sunday\n      }\n      lastAttendanceDate\n      lastMeasure {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      memberMeasures(take: 6, orderBy: { date: \"desc\" }) {\n        id\n        date\n        weight\n        corporalFat\n        muscle\n        bodyMassIndex\n        corporalWaterPct\n        calories\n      }\n    }\n  }\n": types.MemberDetailDocument,
    "\n  query memberMeasures($input: GetMeasuresInput) {\n    getMeasures(input: $input) {\n      measures {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      pagination {\n        total\n        pageSize\n      }\n    }\n  }\n": types.MemberMeasuresDocument,
    "\n  query attendanceByYear($year: Int!, $memberCode: String!) {\n    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {\n      year\n      month\n      total\n    }\n  }\n": types.AttendanceByYearDocument,
    "\n  query attendanceMonthDetails(\n    $year: Int!\n    $month: Int!\n    $memberCode: String!\n  ) {\n    getMemberAttendanceLogsDetails(\n      year: $year\n      month: $month\n      memberCode: $memberCode\n    ) {\n      classDate\n      classDurationInMinutes\n      classType\n      localTime\n    }\n  }\n": types.AttendanceMonthDetailsDocument,
    "\n  query firstAttendance($memberCode: String!) {\n    getMemberAttendanceClasses(memberCode: $memberCode, order: \"asc\", take: 1) {\n      classDate\n    }\n  }\n": types.FirstAttendanceDocument,
    "\n  mutation addMeasureSheet($measure: AddMeasureInput) {\n    addMeasure(measure: $measure) {\n      id\n    }\n  }\n": types.AddMeasureSheetDocument,
    "\n  mutation updateMeasureSheet($measure: UpdateMeasureInput) {\n    updateMeasure(measure: $measure) {\n      id\n    }\n  }\n": types.UpdateMeasureSheetDocument,
    "\n  mutation deleteMeasureRow($id: Int!, $memberCode: String!) {\n    deleteMeasure(id: $id, memberCode: $memberCode) {\n      id\n    }\n  }\n": types.DeleteMeasureRowDocument,
    "\n  query activeMembers($offset: Int, $limit: Int) {\n    getAllMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n        memberAttendance {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n        }\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n": types.ActiveMembersDocument,
    "\n  query inactiveMembers($offset: Int, $limit: Int) {\n    getAllInactiveMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n": types.InactiveMembersDocument,
    "\n  query searchMembers($filter: String) {\n    getFilteredMembers(\n      column: \"name\"\n      comparator: \"contains\"\n      filter: $filter\n    ) {\n      code\n      name\n      category\n      isActive\n      lastAttendanceDate\n      currentWeight\n    }\n  }\n": types.SearchMembersDocument,
    "\n  mutation addMemberSheet($member: AddMemberInput) {\n    addMember(member: $member) {\n      code\n      name\n    }\n  }\n": types.AddMemberSheetDocument,
    "\n  mutation updateMemberSheet($member: UpdateMemberInput) {\n    updateMember(member: $member) {\n      code\n      name\n    }\n  }\n": types.UpdateMemberSheetDocument,
    "\n  query visitMember($code: String!) {\n    getVisitMember(code: $code) {\n      name\n      lastMeasure {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      memberMeasures(take: 12, orderBy: { date: \"desc\" }) {\n        id\n        date\n        weight\n        bodyMassIndex\n        corporalFat\n        muscle\n        corporalWaterPct\n        calories\n      }\n    }\n  }\n": types.VisitMemberDocument,
    "\n  query visitAttendanceByYear($year: Int!, $memberCode: String!) {\n    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {\n      year\n      month\n      total\n    }\n  }\n": types.VisitAttendanceByYearDocument,
    "\n  query visitAttendanceMonth($year: Int!, $month: Int!, $memberCode: String!) {\n    getMemberAttendanceLogsDetails(\n      year: $year\n      month: $month\n      memberCode: $memberCode\n    ) {\n      classDate\n      classDurationInMinutes\n      classType\n      localTime\n    }\n  }\n": types.VisitAttendanceMonthDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($input: OwnerSignInInput) {\n    ownerSignIn(input: $input) {\n      jwt\n    }\n  }\n"): (typeof documents)["\n  mutation login($input: OwnerSignInInput) {\n    ownerSignIn(input: $input) {\n      jwt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePwd($currentPwd: String!, $pwd: String!) {\n    updatePwd(currentPwd: $currentPwd, pwd: $pwd)\n  }\n"): (typeof documents)["\n  mutation updatePwd($currentPwd: String!, $pwd: String!) {\n    updatePwd(currentPwd: $currentPwd, pwd: $pwd)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query whoAmIProfile {\n    whoAmI {\n      username\n      name\n      email\n      role\n      lastPasswordChangeDate\n    }\n  }\n"): (typeof documents)["\n  query whoAmIProfile {\n    whoAmI {\n      username\n      name\n      email\n      role\n      lastPasswordChangeDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {\n    getGymClasses(gte: $gte, lt: $lt) {\n      id\n      classDate\n      classType\n      classDurationInMinutes\n      classDescription\n      gymClassOnTimes {\n        gymClassTime {\n          id\n          localTime\n        }\n      }\n      attendanceList {\n        gymClassTimeId\n        members {\n          code\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {\n    getGymClasses(gte: $gte, lt: $lt) {\n      id\n      classDate\n      classType\n      classDurationInMinutes\n      classDescription\n      gymClassOnTimes {\n        gymClassTime {\n          id\n          localTime\n        }\n      }\n      attendanceList {\n        gymClassTimeId\n        members {\n          code\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addAttendances($input: MembersAttendancesInput!) {\n    addMembersAttendances(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addAttendances($input: MembersAttendancesInput!) {\n    addMembersAttendances(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeAttendances($input: MembersAttendancesInput!) {\n    removeMembersAttendances(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeAttendances($input: MembersAttendancesInput!) {\n    removeMembersAttendances(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addGymClassSheet($input: AddClassInput) {\n    addGymClass(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addGymClassSheet($input: AddClassInput) {\n    addGymClass(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {\n    addTimes(classId: $classId, timeIds: $timeIds) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {\n    addTimes(classId: $classId, timeIds: $timeIds) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gymClassTypes {\n    getGymClassTypes\n  }\n"): (typeof documents)["\n  query gymClassTypes {\n    getGymClassTypes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gymClassTimes {\n    allGymClassTimes {\n      id\n      localTime\n    }\n  }\n"): (typeof documents)["\n  query gymClassTimes {\n    allGymClassTimes {\n      id\n      localTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addGymClassTimeConfig($localTime: LocalTime!) {\n    addGymClassTime(localTime: $localTime) {\n      id\n      localTime\n    }\n  }\n"): (typeof documents)["\n  mutation addGymClassTimeConfig($localTime: LocalTime!) {\n    addGymClassTime(localTime: $localTime) {\n      id\n      localTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EquipmentCategories {\n    getEquipmentCategories {\n      uuid\n      name\n      equipment {\n        uuid\n        description\n        brand\n        total\n      }\n    }\n  }\n"): (typeof documents)["\n  query EquipmentCategories {\n    getEquipmentCategories {\n      uuid\n      name\n      equipment {\n        uuid\n        description\n        brand\n        total\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddEquipmentCategory(\n    $name: String!\n    $equipment: [UpsertEquipmentInput]\n  ) {\n    addEquipmentCategory(name: $name, equipment: $equipment) {\n      uuid\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation AddEquipmentCategory(\n    $name: String!\n    $equipment: [UpsertEquipmentInput]\n  ) {\n    addEquipmentCategory(name: $name, equipment: $equipment) {\n      uuid\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateEquipmentCategoryName($uuid: UUID!, $name: String!) {\n    updateEquipmentCategoryName(uuid: $uuid, name: $name) {\n      uuid\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateEquipmentCategoryName($uuid: UUID!, $name: String!) {\n    updateEquipmentCategoryName(uuid: $uuid, name: $name) {\n      uuid\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpsertEquipment($input: UpsertEquipmentInput!) {\n    upsertEquipment(input: $input) {\n      uuid\n      description\n      brand\n      total\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertEquipment($input: UpsertEquipmentInput!) {\n    upsertEquipment(input: $input) {\n      uuid\n      description\n      brand\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteEquipment($equipmentUuid: UUID!) {\n    deleteEquipment(equipmentUuid: $equipmentUuid) {\n      uuid\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteEquipment($equipmentUuid: UUID!) {\n    deleteEquipment(equipmentUuid: $equipmentUuid) {\n      uuid\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteEquipmentCategory($categoryUuid: UUID!) {\n    deleteEquipmentCategory(categoryUuid: $categoryUuid) {\n      uuid\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteEquipmentCategory($categoryUuid: UUID!) {\n    deleteEquipmentCategory(categoryUuid: $categoryUuid) {\n      uuid\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query homeSummary($today: LocalDate!) {\n    getHomeSummary(today: $today) {\n      activeMembers\n      newMembersThisMonth\n      attendancesThisWeek\n      attendancesLastWeek\n      last7Days {\n        date\n        count\n      }\n      birthdays {\n        code\n        name\n      }\n      atRisk {\n        code\n        name\n      }\n      unmeasured {\n        code\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query homeSummary($today: LocalDate!) {\n    getHomeSummary(today: $today) {\n      activeMembers\n      newMembersThisMonth\n      attendancesThisWeek\n      attendancesLastWeek\n      last7Days {\n        date\n        count\n      }\n      birthdays {\n        code\n        name\n      }\n      atRisk {\n        code\n        name\n      }\n      unmeasured {\n        code\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query memberDetail($code: String!) {\n    getMember(code: $code) {\n      code\n      name\n      genre\n      birthDate\n      height\n      isActive\n      phone\n      email\n      observations\n      preferredClassTime\n      category\n      memberAttendance {\n        memberCode\n        monday\n        tuesday\n        wednesday\n        thursday\n        friday\n        saturday\n        sunday\n      }\n      lastAttendanceDate\n      lastMeasure {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      memberMeasures(take: 6, orderBy: { date: \"desc\" }) {\n        id\n        date\n        weight\n        corporalFat\n        muscle\n        bodyMassIndex\n        corporalWaterPct\n        calories\n      }\n    }\n  }\n"): (typeof documents)["\n  query memberDetail($code: String!) {\n    getMember(code: $code) {\n      code\n      name\n      genre\n      birthDate\n      height\n      isActive\n      phone\n      email\n      observations\n      preferredClassTime\n      category\n      memberAttendance {\n        memberCode\n        monday\n        tuesday\n        wednesday\n        thursday\n        friday\n        saturday\n        sunday\n      }\n      lastAttendanceDate\n      lastMeasure {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      memberMeasures(take: 6, orderBy: { date: \"desc\" }) {\n        id\n        date\n        weight\n        corporalFat\n        muscle\n        bodyMassIndex\n        corporalWaterPct\n        calories\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query memberMeasures($input: GetMeasuresInput) {\n    getMeasures(input: $input) {\n      measures {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      pagination {\n        total\n        pageSize\n      }\n    }\n  }\n"): (typeof documents)["\n  query memberMeasures($input: GetMeasuresInput) {\n    getMeasures(input: $input) {\n      measures {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      pagination {\n        total\n        pageSize\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query attendanceByYear($year: Int!, $memberCode: String!) {\n    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {\n      year\n      month\n      total\n    }\n  }\n"): (typeof documents)["\n  query attendanceByYear($year: Int!, $memberCode: String!) {\n    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {\n      year\n      month\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query attendanceMonthDetails(\n    $year: Int!\n    $month: Int!\n    $memberCode: String!\n  ) {\n    getMemberAttendanceLogsDetails(\n      year: $year\n      month: $month\n      memberCode: $memberCode\n    ) {\n      classDate\n      classDurationInMinutes\n      classType\n      localTime\n    }\n  }\n"): (typeof documents)["\n  query attendanceMonthDetails(\n    $year: Int!\n    $month: Int!\n    $memberCode: String!\n  ) {\n    getMemberAttendanceLogsDetails(\n      year: $year\n      month: $month\n      memberCode: $memberCode\n    ) {\n      classDate\n      classDurationInMinutes\n      classType\n      localTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query firstAttendance($memberCode: String!) {\n    getMemberAttendanceClasses(memberCode: $memberCode, order: \"asc\", take: 1) {\n      classDate\n    }\n  }\n"): (typeof documents)["\n  query firstAttendance($memberCode: String!) {\n    getMemberAttendanceClasses(memberCode: $memberCode, order: \"asc\", take: 1) {\n      classDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addMeasureSheet($measure: AddMeasureInput) {\n    addMeasure(measure: $measure) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addMeasureSheet($measure: AddMeasureInput) {\n    addMeasure(measure: $measure) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMeasureSheet($measure: UpdateMeasureInput) {\n    updateMeasure(measure: $measure) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateMeasureSheet($measure: UpdateMeasureInput) {\n    updateMeasure(measure: $measure) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteMeasureRow($id: Int!, $memberCode: String!) {\n    deleteMeasure(id: $id, memberCode: $memberCode) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMeasureRow($id: Int!, $memberCode: String!) {\n    deleteMeasure(id: $id, memberCode: $memberCode) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query activeMembers($offset: Int, $limit: Int) {\n    getAllMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n        memberAttendance {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n        }\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n"): (typeof documents)["\n  query activeMembers($offset: Int, $limit: Int) {\n    getAllMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n        memberAttendance {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n        }\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query inactiveMembers($offset: Int, $limit: Int) {\n    getAllInactiveMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n"): (typeof documents)["\n  query inactiveMembers($offset: Int, $limit: Int) {\n    getAllInactiveMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchMembers($filter: String) {\n    getFilteredMembers(\n      column: \"name\"\n      comparator: \"contains\"\n      filter: $filter\n    ) {\n      code\n      name\n      category\n      isActive\n      lastAttendanceDate\n      currentWeight\n    }\n  }\n"): (typeof documents)["\n  query searchMembers($filter: String) {\n    getFilteredMembers(\n      column: \"name\"\n      comparator: \"contains\"\n      filter: $filter\n    ) {\n      code\n      name\n      category\n      isActive\n      lastAttendanceDate\n      currentWeight\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addMemberSheet($member: AddMemberInput) {\n    addMember(member: $member) {\n      code\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation addMemberSheet($member: AddMemberInput) {\n    addMember(member: $member) {\n      code\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMemberSheet($member: UpdateMemberInput) {\n    updateMember(member: $member) {\n      code\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation updateMemberSheet($member: UpdateMemberInput) {\n    updateMember(member: $member) {\n      code\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query visitMember($code: String!) {\n    getVisitMember(code: $code) {\n      name\n      lastMeasure {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      memberMeasures(take: 12, orderBy: { date: \"desc\" }) {\n        id\n        date\n        weight\n        bodyMassIndex\n        corporalFat\n        muscle\n        corporalWaterPct\n        calories\n      }\n    }\n  }\n"): (typeof documents)["\n  query visitMember($code: String!) {\n    getVisitMember(code: $code) {\n      name\n      lastMeasure {\n        id\n        date\n        weight\n        weightDiff\n        corporalFat\n        corporalFatDiff\n        muscle\n        muscleDiff\n        bodyMassIndex\n        bodyMassIndexDiff\n        corporalWaterPct\n        corporalWaterPctDiff\n        calories\n        caloriesDiff\n        muscleResult\n        bodyMassIndexResult\n        corporalFatResult\n        corporalWaterPctResult\n        caloriesResult\n      }\n      memberMeasures(take: 12, orderBy: { date: \"desc\" }) {\n        id\n        date\n        weight\n        bodyMassIndex\n        corporalFat\n        muscle\n        corporalWaterPct\n        calories\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query visitAttendanceByYear($year: Int!, $memberCode: String!) {\n    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {\n      year\n      month\n      total\n    }\n  }\n"): (typeof documents)["\n  query visitAttendanceByYear($year: Int!, $memberCode: String!) {\n    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {\n      year\n      month\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query visitAttendanceMonth($year: Int!, $month: Int!, $memberCode: String!) {\n    getMemberAttendanceLogsDetails(\n      year: $year\n      month: $month\n      memberCode: $memberCode\n    ) {\n      classDate\n      classDurationInMinutes\n      classType\n      localTime\n    }\n  }\n"): (typeof documents)["\n  query visitAttendanceMonth($year: Int!, $month: Int!, $memberCode: String!) {\n    getMemberAttendanceLogsDetails(\n      year: $year\n      month: $month\n      memberCode: $memberCode\n    ) {\n      classDate\n      classDurationInMinutes\n      classType\n      localTime\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;