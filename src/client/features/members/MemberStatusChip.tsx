import { StatusChip } from '../../design-system';
import { memberStatus } from '../../../common/memberStatus';
import { LocalDate } from '../../../common/dates';

type Props = {
  isActive: boolean;
  lastAttendanceDate: LocalDate | null;
  today: LocalDate;
};

function MemberStatusChip({ isActive, lastAttendanceDate, today }: Props) {
  const s = memberStatus(isActive, lastAttendanceDate, today);
  if (s === 'inactive')
    return <StatusChip variant="neutral" label="Inactivo" />;
  if (s === 'risk') return <StatusChip variant="warning" label="En riesgo" />;
  return <StatusChip variant="success" label="Activo" />;
}

export default MemberStatusChip;
