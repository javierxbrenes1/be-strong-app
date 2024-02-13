import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ScaleIcon from '@mui/icons-material/Scale';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { CircularProgress } from '@mui/material';
import CardTitle from '../../components/CardTitle';

import AddMeasures from '../members/AddMeasure';
import Member from '../../../common/models/Member';
import Measure from '../../../common/models/Measure';
import { formatDate } from '../../utils/helpers';

import { Measures } from '../../types';
import useMemberLastMeasure from './useMemberLastMeasure';
import Loading from '../../components/Loading';
import { useMemberContext } from './MemberContext';
import MeasureDetails from './MeasureDetails';

function MemberLastMeasure(props: {
  member: Member;
  selectedMeasureType: Measures | null;
  onSelectMeasureType: (t: Measures | null) => void;
}) {
  const { member, selectedMeasureType, onSelectMeasureType } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { lastMeasure, loading } = useMemberLastMeasure(member.code);
  const { triggerReloadLastMeasure, triggerReloadMeasures } =
    useMemberContext();

  const onAddClick = () => {
    setOpenModal(true);
  };

  const actions = [
    {
      ActionIcon: AddCircleOutlineIcon,
      onActionIconClick: onAddClick,
      tooltip: 'Agregar',
    },
  ];

  useEffect(() => {
    if (!lastMeasure) {
      onSelectMeasureType(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMeasure]);

  let details;

  if (!lastMeasure) {
    details = <Typography>No hay Datos.</Typography>;
  } else {
    details = (
      <MeasureDetails
        measure={lastMeasure}
        onSelectMeasureType={onSelectMeasureType}
        selectedMeasureType={selectedMeasureType}
      />
    );
  }

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <CardTitle actions={actions}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <ScaleIcon />
              <Typography variant="h6" component="p">
                Últimas Medidas
                {!loading ? (
                  <Typography variant="body2" component="span">
                    {lastMeasure?.date
                      ? ` ${formatDate(lastMeasure.date)}`
                      : ''}
                  </Typography>
                ) : (
                  <CircularProgress size="1rem" />
                )}
              </Typography>
            </Box>
          </CardTitle>
          {details}
        </CardContent>
      </Card>
      {openModal ? (
        <AddMeasures
          open
          onClose={() => {
            setOpenModal(false);
          }}
          member={member}
          onSuccess={(newMeasure: Measure) => {
            if (
              !lastMeasure ||
              dayjs(newMeasure.date).isAfter(lastMeasure?.date)
            ) {
              triggerReloadLastMeasure();
            }
          }}
        />
      ) : null}
    </>
  );
}

export default MemberLastMeasure;
