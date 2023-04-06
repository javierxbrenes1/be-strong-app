import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import IconType from '../models/Icon';

const InputContainer = styled(Box)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: '#fff',
  borderRadius: '20px',
  padding: '0 10px',
  boxShadow: '0 1px 4px #e3e3e3',
  '& input': {
    border: 'none',
    height: '90%',
    background: 'transparent',
    '&:focus': {
      border: 'none',
      outline: 'none',
    },
  },
}));

function BsInput(props: {
  Icon?: IconType;
  placeholder: string;
  onChange: (newVal: string) => void;
}) {
  const [localValue, setLocalValue] = useState('');
  const { Icon, placeholder, onChange } = props;

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = ev;
    onChange(value);
    setLocalValue(value);
  };

  return (
    <InputContainer>
      {Icon && <Icon />}
      <input
        placeholder={placeholder}
        onChange={handleOnChange}
        value={localValue}
      />
    </InputContainer>
  );
}

export default BsInput;