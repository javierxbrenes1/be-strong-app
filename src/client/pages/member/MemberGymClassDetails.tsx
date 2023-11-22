import { useQuery } from '@apollo/client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import dayjs from 'dayjs';
import { GET_MEMBER_ATTENDANCE_LOG_DETAILS } from '../../queries/memberPage';
import MemberAttendanceLogsDetails from '../../../common/models/MemberAttendanceLogsDetails';
import { formatDate } from '../../utils/helpers';
import { formatIsoTime } from '../../utils/memberUtils';
import SimpleTable from '../../components/SimpleTable';
import { FULL_MONTHS } from '../../labels';

type Data = {
  getMemberAttendanceLogsDetails: MemberAttendanceLogsDetails[];
};

const columns = [
  {
    id: 'classDate',
    text: 'Fecha',
  },
  {
    id: 'classDurationInMinutes',
    text: 'Duración',
  },
  {
    id: 'classType',
    text: 'Tipo de clase',
  },
  {
    id: 'schedule',
    text: 'Hora de la clase',
  },
];

const buildRows = (data?: Data) => {
  if (!data) {
    return [];
  }
  const { getMemberAttendanceLogsDetails } = data;
  return getMemberAttendanceLogsDetails.map(
    ({ classDate, classDurationInMinutes, classType, isoTime }) => ({
      classDurationInMinutes,
      classType,
      classDate: formatDate(dayjs(classDate).toDate()), // fix me
      schedule: formatIsoTime(isoTime),
    })
  );
};

function MemberGymClassDetails(props: {
  year: number;
  month: number;
  memberCode: string;
  onClose: () => void;
}) {
  const { year, month, memberCode, onClose } = props;

  const { loading, data } = useQuery<Data>(GET_MEMBER_ATTENDANCE_LOG_DETAILS, {
    fetchPolicy: 'network-only',
    variables: {
      year,
      month,
      memberCode,
    },
  });

  return (
    <Dialog open fullScreen onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap="1rem">
            <SportsGymnasticsIcon />
            <Typography variant="h5" color="primary">
              Asistencias Durante {FULL_MONTHS[month - 1]}
            </Typography>
          </Stack>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider variant="fullWidth" />
      <DialogContent>
        <SimpleTable
          loading={loading}
          columns={columns}
          rows={buildRows(data)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default MemberGymClassDetails;
