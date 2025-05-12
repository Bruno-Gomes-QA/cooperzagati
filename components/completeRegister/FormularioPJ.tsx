'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  formData: any
  setFormData: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormularioPJ({ formData, setFormData, handleChange }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="nome_empresa">Nome da organização</Label>
        <Input name="nome_empresa" required onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input name="cnpj" required onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="responsavel">Nome do responsável</Label>
        <Input name="responsavel" required onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail corporativo</Label>
        <Input name="email" required onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo_local">Tipo de local</Label>
        <Input name="tipo_local" placeholder="Empresa, escola, condomínio, etc" onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantidade_semanal">Quantidade estimada de recicláveis por semana</Label>
        <Input name="quantidade_semanal" onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="infraestrutura">Já possui infraestrutura de coleta?</Label>
        <Input name="infraestrutura" placeholder="Ex: gaiola, contêiner" onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dias_preferencia">Dias e horários preferenciais</Label>
        <Input name="dias_preferencia" placeholder="Seg, Qua, Sex - Manhã" onChange={handleChange} className="rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone para contato</Label>
        <Input name="telefone" onChange={handleChange} className="rounded-md" />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="parceria" onCheckedChange={(checked) =>
          setFormData((prev: any) => ({ ...prev, quer_parceria: !!checked }))
        } />
        <Label htmlFor="parceria">Deseja realizar parceria educativa ou de divulgação?</Label>
      </div>
    </>
  )
}
