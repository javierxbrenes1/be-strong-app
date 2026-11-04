import { Avatar } from '@mui/material';
import { avatarColor, initials } from './avatar';

type Props = { name: string; size?: number };

// aria-hidden: el nombre siempre se muestra como texto al lado.
function MemberAvatar({ name, size = 34 }: Props) {
  return (
    <Avatar
      aria-hidden
      sx={{
        width: size,
        height: size,
        bgcolor: avatarColor(name),
        color: 'common.white',
        fontSize: size * 0.4,
        fontWeight: 700,
      }}
    >
      {initials(name)}
    </Avatar>
  );
}

export default MemberAvatar;
