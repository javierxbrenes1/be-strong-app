import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { useLazyQuery } from '@apollo/client';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CardTitle from '../../components/CardTitle';
import BsYearPopover from '../../components/BsYearPopover';
import { GET_MEMBER_ATTENDANCE_LOG_BY_YEAR } from '../../queries/memberPage';
import Loading from '../../components/Loading';
import { FULL_MONTHS } from '../../labels';
import BsMonthCount from '../../components/BsMonthCount';
import MemberAttendanceLogByYear from '../../../common/models/MemberAttendanceLogByYear';
import MemberGymClassDetails from './MemberGymClassDetails';

function MemberGymClassHistory(props: {
  memberCode: string;
  titleVariant?: 'h5' | 'h6';
}) {
  const { memberCode, titleVariant } = props;
  const [date, setDate] = useState(dayjs());
  const [showDetails, setShowDetails] = useState(false);
  const [monthToShow, setMonthToShow] = useState<number | null>(null);
  const [getData, { data }] = useLazyQuery<{
    getMemberAttendanceLogByYear: MemberAttendanceLogByYear[];
  }>(GET_MEMBER_ATTENDANCE_LOG_BY_YEAR, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getData({
      variables: {
        year: date.year(),
        memberCode,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const getCount = useCallback(
    (month: number) => {
      if (!data) {
        return 0;
      }
      const { getMemberAttendanceLogByYear } = data;
      const details = getMemberAttendanceLogByYear.find(
        (r) => r.month === month
      );
      return details?.total ?? 0;
    },
    [data]
  );

  const getTotal = useCallback(() => {
    let total = 0;
    if (!data) {
      return total;
    }
    data.getMemberAttendanceLogByYear.forEach((r) => {
      total += r.total;
    });
    return total;
  }, [data]);

  const handleMonthClick = (month: number) => () => {
    setMonthToShow(month);
    setShowDetails(true);
  };

  const handleOnDetailsClose = () => {
    setShowDetails(false);
    setMonthToShow(null);
  };

  const title = 'Asistencias';

  return (
    <>
      <Card elevation={3} sx={{ margin: '16px 0' }}>
        <CardContent>
          <CardTitle
            title={title}
            titleVariant={titleVariant}
            Icon={ChecklistIcon}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            marginBottom="10px"
          >
            <Stack direction="row" gap="4px" alignItems="center">
              <Typography variant="h4">{date.year()}</Typography>
              <BsYearPopover date={date} onYearSelection={setDate} />
            </Stack>
            <Box>
              <Typography variant="h4">Total: {getTotal()}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" gap="20px" flexWrap="wrap" alignItems="center">
            {FULL_MONTHS.map((month, index) => {
              const monthIndex = index + 1;
              const count = getCount(monthIndex);
              return (
                <BsMonthCount
                  key={month}
                  onClick={count ? handleMonthClick(monthIndex) : undefined}
                  month={month}
                  count={count}
                />
              );
            })}
          </Stack>
        </CardContent>
      </Card>
      {showDetails && monthToShow && (
        <MemberGymClassDetails
          memberCode={memberCode}
          onClose={handleOnDetailsClose}
          year={date.year()}
          month={monthToShow}
        />
      )}
    </>
  );
}

export default MemberGymClassHistory;
