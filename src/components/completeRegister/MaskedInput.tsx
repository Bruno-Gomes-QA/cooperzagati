import InputMask from 'react-input-mask'
import { ChangeEvent, JSX } from 'react'

interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'mask'> {
  mask: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function MaskedInput({ mask, value, onChange, ...props }: MaskedInputProps): JSX.Element {
  return (
    <InputMask mask={mask} value={value} onChange={onChange} {...props}>
      {(inputProps: any) => <input {...inputProps} />}
    </InputMask>
  )
}
