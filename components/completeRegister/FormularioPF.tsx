'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  formData: any
  setFormData: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormularioPF({ formData, setFormData, handleChange }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="nome_completo">Nome completo</Label>
        <Input name="nome_completo" required onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf">CPF (opcional)</Label>
        <Input name="cpf" onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="moradores">Quantas pessoas moram com você?</Label>
        <Input type="number" name="moradores" required onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="material">Tipo de material que mais recicla</Label>
        <Input name="material" onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone para contato</Label>
        <Input name="telefone" onChange={handleChange} className="rounded-md" />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="lembretes" onCheckedChange={(checked) =>
          setFormData((prev: any) => ({ ...prev, receber_dicas: !!checked }))
        } />
        <Label htmlFor="lembretes">Deseja receber lembretes ou dicas?</Label>
      </div>
    </>
  )
}
