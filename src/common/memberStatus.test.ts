import { describe, expect, it } from 'vitest';
import { memberStatus } from './memberStatus';

describe('memberStatus', () => {
  it('inactive wins', () => {
    expect(memberStatus(false, '2026-11-01', '2026-11-03')).toBe('inactive');
  });
  it('never attended is risk', () => {
    expect(memberStatus(true, null, '2026-11-03')).toBe('risk');
  });
  it('14 days ago is not risk, 15 is', () => {
    expect(memberStatus(true, '2026-10-20', '2026-11-03')).toBe('active');
    expect(memberStatus(true, '2026-10-19', '2026-11-03')).toBe('risk');
  });
});
