import InputMask from 'react-input-mask';

import { ChangeEvent, JSX } from 'react';

interface MaskedInputProps {
  mask: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export function MaskedInput({ mask, value, onChange, ...props }: MaskedInputProps): JSX.Element {
  return (
    <InputMask mask={mask} value={value} onChange={onChange} {...props} />
  );
};
