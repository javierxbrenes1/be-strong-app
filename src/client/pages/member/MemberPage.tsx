import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../../components/Loading';
import PageContainer from '../../components/PageContainer';
import Measure from '../../models/Measure';
import Member from '../../models/Member';
import { GET_MEMBER_DETAILS } from '../../queries/memberPage';
import { createAvatarLink } from '../utils/helpers';
import MemberInfo from './MemberInfo';
import MemberLastMeasure from './MemberLastMeasure';
import MemberMeasures from './MemberMeasures';
import { MeasureType } from './utils/measureTypes';

function MemberPage() {
  const { code } = useParams();
  const [selectedMeasure, setSelectedMeasure] = useState<MeasureType | null>(
    null
  );
  const [member, setMember] = useState<Member | null>(null);

  const { loading } = useQuery<{ getMember: Member }>(GET_MEMBER_DETAILS, {
    fetchPolicy: 'no-cache',
    variables: {
      code,
      take: 5,
    },
    onError(error) {
      console.error(error);
    },
    onCompleted(data) {
      const { getMember } = data;
      setMember(getMember);
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (!member) return null;

  const handleNewMeasureAdded = (measure: Measure) => {
    setMember((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        memberMeasures: [measure, ...(prev?.memberMeasures || [])],
      };
    });
  };

  return (
    <PageContainer
      text={member?.name || ''}
      Icon={member?.avatar || createAvatarLink(member?.name || '')}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MemberInfo member={member} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MemberLastMeasure
            member={member}
            selectedMeasure={selectedMeasure}
            onSelectMeasure={(ev: MeasureType) => {
              setSelectedMeasure(ev);
            }}
            onNewMeasureAdded={handleNewMeasureAdded}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MemberMeasures
            memberMeasures={member.memberMeasures || []}
            selectedMeasure={selectedMeasure}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default MemberPage;
