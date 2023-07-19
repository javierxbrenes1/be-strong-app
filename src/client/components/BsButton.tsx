import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconType from '../../common/models/Icon';

const MyButton = styled(Button)<{ hoverColor?: string }>(({ hoverColor }) => ({
  width: '100%',
  background: '#fff',
  fontSize: '14px',
  border: 'none',
  borderRadius: '10px',
  padding: '10px',
  color: '#000',
  boxShadow: '0 1px 4px #e3e3e3',
  fontWeight: 'bold',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: hoverColor || '#FF6E31',
    color: '#fff',
  },
}));

function BsButton(props: {
  text?: string;
  onClick: () => void;
  hoverColor?: string;
  Icon?: IconType;
  disabled?: boolean;
}) {
  const { text, onClick, hoverColor, Icon, disabled } = props;
  return (
    <MyButton onClick={onClick} hoverColor={hoverColor} disabled={disabled}>
      {Icon && <Icon />} {text}
    </MyButton>
  );
}

export default BsButton;
