import { useMutation, useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import PageContainer from '../../components/PageContainer';
import Measure from '../../../common/models/Measure';
import Member from '../../../common/models/Member';
import { GET_MEMBER_DETAILS } from '../../queries/memberPage';
import { createAvatarLink } from '../../utils/helpers';
import MemberInfo from './MemberInfo';
import MemberLastMeasure from './MemberLastMeasure';
import MemberMeasures from './MemberMeasures';
import { MeasureType } from '../../utils/measureTypes';
import VisitLink from './VisitLink';
import { UPDATE_MEMBER_INFO } from '../../mutations/updateMember';
import { UPDATE_MEASURE } from '../../mutations/Measures';
import UpdateMemberArgs from '../../../common/actionModels/UpdateMember';
import { CrudAction } from '../../types';
import { GENERAL_ERROR_MESSAGES } from '../../constants';
import { DAYS } from '../../labels';

const handleError = (error: unknown, action: CrudAction) => {
  console.error(error);
  toast.error(GENERAL_ERROR_MESSAGES[action], {
    position: 'top-right',
  });
};

const showSucccessMessage = (autoCloseAt = 5000) => {
  toast.success('Los cambios fueron almacenados satisfactoriamente.', {
    position: 'top-right',
    autoClose: autoCloseAt,
  });
};

function MemberPage() {
  const { code } = useParams();
  const [selectedMeasureType, setSelectedMeasureType] =
    useState<MeasureType | null>(null);
  const [member, setMember] = useState<Member | null>(null);

  const handleNewMeasureAdded = (measure: Measure) => {
    setMember((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        memberMeasures: [measure],
      };
    });
  };

  const { loading } = useQuery<{ getMember: Member }>(GET_MEMBER_DETAILS, {
    fetchPolicy: 'no-cache',
    variables: {
      code,
      take: 1,
    },
    onError(error) {
      handleError(error, 'loading');
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
        setMember((mm) => ({ ...(mm ?? {}) } as Member));
        handleError(error, 'updating');
      },
      onCompleted(data) {
        const { updateMember } = data;
        setMember((st) => ({ ...st, ...updateMember }));
        showSucccessMessage();
      },
    }
  );

  const [updateLastMeasure] = useMutation<{ updateMeasure: Measure }>(
    UPDATE_MEASURE,
    {
      onError(error) {
        handleError(error, 'updating');
      },
      onCompleted(data) {
        const { updateMeasure } = data;
        handleNewMeasureAdded(updateMeasure);
        showSucccessMessage(1000);
      },
    }
  );

  const handleMeasureUpdate = (
    id: number,
    measure: MeasureType,
    value: number
  ) => {
    updateLastMeasure({
      variables: {
        measure: {
          [measure]: value,
          id,
          memberCode: member?.code ?? code,
        },
      },
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (!member) return null;

  const handleUpdateMember = (details: UpdateMemberArgs) => {
    const { memberAttendance } = details;
    const newMemberAttendance: Record<string, boolean> = {};
    if (memberAttendance) {
      type DayProp = keyof typeof memberAttendance;
      Object.keys(DAYS).forEach((day) => {
        newMemberAttendance[day] = Boolean(memberAttendance[day as DayProp]);
      });
    }
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
          ...(memberAttendance
            ? { memberAttendance: newMemberAttendance }
            : {}),
          ...(details.preferredClassTime
            ? {
                preferredClassTime: parseInt(
                  String(details.preferredClassTime)
                ),
              }
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
            onEditMeasure={handleMeasureUpdate}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <MemberMeasures selectedMeasureType={selectedMeasureType} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default MemberPage;
