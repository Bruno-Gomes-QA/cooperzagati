import InputMask from 'react-input-mask'
import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from 'react'

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function MaskedInput({ mask, value, onChange, ...props }: MaskedInputProps) {
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {(inputProps: InputHTMLAttributes<HTMLInputElement>) => (
        <Input {...inputProps} {...props} />
      )}
    </InputMask>
  )
}
