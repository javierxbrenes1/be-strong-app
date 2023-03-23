import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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
  text: string;
  onClick: () => void;
  hoverColor?: string;
}) {
  const { text, onClick, hoverColor } = props;
  return (
    <MyButton onClick={onClick} hoverColor={hoverColor}>
      {text}
    </MyButton>
  );
}

export default BsButton;
