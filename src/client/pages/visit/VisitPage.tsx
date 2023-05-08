import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import { decode } from 'js-base64';
import { Grid, Typography } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import PageTitle from '../../components/PageTitle';
import Loading from '../../components/Loading';
import { GET_VISIT_MEASURES } from '../../queries/visitPage';
import Measure from '../../models/Measure';
import Pagination from '../../models/Pagination';
import { MeasureType } from '../member/utils/measureTypes';
import MeasureDetails from './MeasureDetails';

const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  padding: '10px',
  background: theme.palette.primary.main,
}));

const InternalContainer = styled(Box)({
  background: '#fff',
  borderRadius: '10px',
  padding: '16px',
  width: '100%',
  height: '100%',
  overflow: 'auto',
});

const Wrapper: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => (
  <Container>
    <InternalContainer>{children}</InternalContainer>
  </Container>
);

const items: { measure: MeasureType; color: string }[] = [
  { measure: 'weight', color: '#4c9173' },
  { measure: 'bodyMassIndex', color: '#453953' },
  { measure: 'calories', color: '#f2910a' },
  { measure: 'corporalFat', color: '#fc3a52' },
  { measure: 'corporalWaterPct', color: '#418c9f' },
  { measure: 'muscle', color: '#49beb7' },
];

function VisitPage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string>('');

  const { loading, data } = useQuery<{
    getMeasures: {
      member: {
        name: string;
        avatar: string;
      };
      measures: Measure[];
      pagination: Pagination;
    };
  }>(GET_VISIT_MEASURES, {
    onError(err) {
      setError(
        'Hubo un error intentando obtener la información solicitada. 😥'
      );
    },
    variables: {
      memberCode: decode(searchParams.get('code') || '') || '',
      offset: 0,
      limit: 5,
    },
  });

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Typography textAlign="center" color="error">
          {error}
        </Typography>
      </Wrapper>
    );
  }

  if (!data) {
    return (
      <Wrapper>
        <Typography textAlign="center" color="error">
          No Hay Datos.
        </Typography>
      </Wrapper>
    );
  }

  const {
    getMeasures: { member, measures },
  } = data;

  return (
    <Wrapper>
      <PageTitle Icon={member.avatar} text={member.name} />
      <Typography variant="subtitle1" color="#757a79">
        👋 Howdy {member.name.split(' ')[0]}, a continuación podrás observar tus
        últimos registros.
      </Typography>
      <Grid container py="20px" spacing={4}>
        {items.map((it) => (
          <Grid item md={6} key={it.measure}>
            <MeasureDetails
              memberMeasures={measures}
              selectedMeasure={it.measure}
              color={it.color}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default VisitPage;
