import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import { decode } from 'js-base64';
import { Typography } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { useQuery } from '@apollo/client';
import PageTitle from '../../components/PageTitle';
import Loading from '../../components/Loading';
import { GET_VISIT_MEMBER } from '../../queries/visitPage';
import Measure from '../../../common/models/Measure';

import { formatDate } from '../../utils/helpers';
import LastMeasureDetails from './lastMeasureDetails';
import VisitMeasures from './VisitMeasures';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  padding: '10px',
  background: theme.palette.grey[100],
}));

const Wrapper: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => (
  <Container>{children}</Container>
);

function VisitPage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string>('');

  const code = decode(searchParams.get('code') || '') || '';

  const { loading: LoadingMember, data: memberData } = useQuery<{
    getVisitMember: {
      name: string;
      avatar: string;
      code: string;
      memberMeasures: Measure[];
    };
  }>(GET_VISIT_MEMBER, {
    variables: {
      ...(code ? { code } : {}),
      take: 1,
      orderBy: {
        date: 'desc',
      },
    },
    onError(err) {
      console.error(err);
      setError(
        'Hubo un error al obtener los datos del miembro o el código no existe. 🔗‍💥'
      );
    },
    onCompleted(data) {
      document.title = data.getVisitMember.name ?? 'Be Strong';
    },
  });

  if (LoadingMember) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  const { getVisitMember: member } = memberData || {};
  const lastMeasure = member?.memberMeasures[0] ?? null;

  if (error) {
    return (
      <Wrapper>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <PageTitle Icon={member?.avatar} text={member?.name ?? ''} />
      <Typography variant="subtitle1" color="#757a79">
        👋 Howdy {member?.name.split(' ')[0]}
        {lastMeasure
          ? `, estos son los datos de tu última medición del ${formatDate(
              lastMeasure?.date
            )}.`
          : ', parece que aún no tienes datos registrados.'}
      </Typography>
      {lastMeasure && <LastMeasureDetails measure={lastMeasure} />}
      {lastMeasure && <VisitMeasures code={member?.code ?? ''} />}
    </Wrapper>
  );
}

export default VisitPage;
