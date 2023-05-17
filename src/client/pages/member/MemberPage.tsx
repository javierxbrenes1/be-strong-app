import { useMutation, useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
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
import VisitLink from './VisitLink';
import { UPDATE_MEMBER_INFO } from '../../mutations/updateMember';
import UpdateMemberArgs from '../../../common/actionModels/UpdateMember';

function MemberPage() {
  const { code } = useParams();
  const [selectedMeasureType, setSelectedMeasureType] =
    useState<MeasureType | null>(null);
  const [member, setMember] = useState<Member | null>(null);

  const { loading } = useQuery<{ getMember: Member }>(GET_MEMBER_DETAILS, {
    fetchPolicy: 'no-cache',
    variables: {
      code,
      take: 1,
    },
    onError(error) {
      console.error(error);
    },
    onCompleted(data) {
      const { getMember } = data;
      setMember(getMember);
    },
  });

  const [updateMemberInfo] = useMutation<{ updateMember: Member }>(
    UPDATE_MEMBER_INFO,
    {
      onError(error) {
        console.error(error);
        toast.error(
          'Hubo un error al actualizar los datos, intentalo nuevamente',
          {
            position: 'top-right',
          }
        );
      },
      onCompleted(data) {
        const { updateMember } = data;
        setMember((st) => ({ ...st, ...updateMember }));

        toast.success('Los cambios fueron almacenados satisfactoriamente.', {
          position: 'top-right',
        });
      },
    }
  );

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

  const handleUpdateMember = (details: UpdateMemberArgs) => {
    updateMemberInfo({
      variables: {
        member: {
          ...details,
          ...(details.birthDate
            ? { birthDate: details.birthDate.getTime() }
            : {}),
          ...(details.height
            ? { height: parseInt(String(details.height)) }
            : {}),
        },
      },
    });
  };

  return (
    <PageContainer
      text={member?.name || ''}
      Icon={member?.avatar || createAvatarLink(member?.name || '')}
      RightAction={
        code ? <VisitLink code={code} name={member?.name} /> : undefined
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MemberInfo member={member} onUpdateMember={handleUpdateMember} />
        </Grid>
        <Grid item xs={12} md={3}>
          <MemberLastMeasure
            member={member}
            selectedMeasureType={selectedMeasureType}
            onSelectMeasureType={(ev: MeasureType) => {
              setSelectedMeasureType(ev);
            }}
            onNewMeasureAdded={handleNewMeasureAdded}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <MemberMeasures
            memberMeasures={member.memberMeasures || []}
            selectedMeasureType={selectedMeasureType}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default MemberPage;
