/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMutation, useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Loading from '../../components/Loading';
import PageContainer from '../../components/PageContainer';
import Member from '../../../common/models/Member';
import { GET_MEMBER_DETAILS } from '../../queries/memberPage';
import { createAvatarLink, isoFormatDate } from '../../utils/helpers';
import MemberInfo from './MemberInfo';
import MemberLastMeasure from './MemberLastMeasure';
import MemberMeasures from './MemberMeasures';
import VisitLink from './VisitLink';
import { UPDATE_MEMBER_INFO } from '../../mutations/updateMember';
import UpdateMemberArgs from '../../../common/actionModels/UpdateMember';
import { CrudAction, Measures } from '../../types';
import { GENERAL_ERROR_MESSAGES } from '../../constants';
import { DAYS } from '../../labels';
import BsShowError from '../../components/BsShowError';
import MemberGymClassHistory from './MemberGymClassHistory';
import updateMembersCacheAfterModifyMember from '../../cacheHelpers/updateMembersCacheAfterModifyMember';

const handleError = (error: unknown, action: string) => {
  BsShowError(error, GENERAL_ERROR_MESSAGES[action as CrudAction]);
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
    useState<Measures | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [newMeasureWasAdded, setNewMeasureWasAdded] = useState<boolean>(false);

  const { loading } = useQuery<{ getMember: Member }>(GET_MEMBER_DETAILS, {
    fetchPolicy: 'no-cache',
    variables: {
      code,
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
      update(cache, { data }) {
        cache.modify({
          fields: {
            getAllMembers: updateMembersCacheAfterModifyMember(
              cache,
              data as unknown as { updateMember: Member }
            ),
          },
        });
      },
    }
  );

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
            ? { birthDate: details.birthDate?.getTime() }
            : {}),
          ...(details.birthDate
            ? { birthDateAsString: isoFormatDate(details.birthDate, true) }
            : {}),
          ...(details.height ? { height: Number(details.height) } : {}),
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
            onSelectMeasureType={(ev: Measures | null) => {
              setSelectedMeasureType(ev);
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <MemberMeasures
            selectedMeasureType={selectedMeasureType}
            memberCode={member.code}
            newMeasureWasAdded={newMeasureWasAdded}
            updateMeasureWasAddedFlag={() => setNewMeasureWasAdded(false)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MemberGymClassHistory memberCode={member.code} />
      </Grid>
    </PageContainer>
  );
}

export default MemberPage;
