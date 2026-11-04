import { LocalDate, addDays } from './dates';
import { RISK_DAYS } from './thresholds';

export type MemberStatus = 'active' | 'inactive' | 'risk';

export function memberStatus(
  isActive: boolean,
  lastAttendance: LocalDate | null,
  today: LocalDate
): MemberStatus {
  if (!isActive) return 'inactive';
  // LocalDate (YYYY-MM-DD) compares lexicographically
  if (!lastAttendance || lastAttendance < addDays(today, -RISK_DAYS)) {
    return 'risk';
  }
  return 'active';
}
