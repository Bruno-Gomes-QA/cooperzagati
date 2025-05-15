'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

interface Props {
  formData: any
  setFormData: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export function FormularioPJ({ formData, setFormData, handleChange }: Props) {
  const sanitizeInput = (name: string, value: string) => {
    switch (name) {
      case 'nome_empresa':
      case 'responsavel':
        return value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
      case 'cnpj':
        return value.replace(/\D/g, '').slice(0, 14)
      case 'telefone':
        return value.replace(/\D/g, '').slice(0, 11)
      default:
        return value
    }
  }

  const handleSanitizedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const sanitized = sanitizeInput(name, value)
    setFormData((prev: any) => ({ ...prev, [name]: sanitized }))
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="nome_empresa">Nome da organização</Label>
        <Input
          name="nome_empresa"
          required
          placeholder="Ex: Padaria Dois Irmãos"
          onChange={handleSanitizedChange}
          value={formData.nome_empresa || ''}
          className="rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ (Opcional)</Label>
        <Input
          name="cnpj"
          placeholder="Ex: 12345678000190"
          onChange={handleSanitizedChange}
          value={formData.cnpj || ''}
          className="rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="responsavel">Nome do responsável</Label>
        <Input
          name="responsavel"
          required
          placeholder="Ex: João da Silva"
          onChange={handleSanitizedChange}
          value={formData.responsavel || ''}
          className="rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail corporativo</Label>
        <Input
          name="email"
          required
          placeholder="contato@empresa.com.br"
          onChange={handleChange}
          value={formData.email || ''}
          className="rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo_local">Tipo de local</Label>
        <select
          name="tipo_local"
          required
          onChange={handleChange}
          value={formData.tipo_local || ''}
          className="bg-black border border-white/20 text-white rounded-md px-4 py-2 w-full"
        >
          <option value="">Selecione...</option>
          <option value="Empresa">Empresa</option>
          <option value="Condomínio">Condomínio</option>
          <option value="Escola">Escola</option>
          <option value="Hospital">Hospital</option>
          <option value="ONG">ONG</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantidade_semanal">Quantidade estimada de recicláveis por semana</Label>
        <select
          name="quantidade_semanal"
          required
          onChange={handleChange}
          value={formData.quantidade_semanal || ''}
          className="bg-black border border-white/20 text-white rounded-md px-4 py-2 w-full"
        >
          <option value="">Selecione...</option>
          <option value="Até 500kg">Até 500kg</option>
          <option value="De 500kg até 1 Tonelada">De 500kg até 1 Tonelada</option>
          <option value="Entre 1 e 3 Toneladas">Entre 1 e 3 Toneladas</option>
          <option value="3+ Toneladas">3+ Toneladas</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="infraestrutura">Já possui infraestrutura de coleta?</Label>
        <Input
          name="infraestrutura"
          required
          placeholder="Ex: contêiner, gaiola, sacos de lixo reforçados..."
          onChange={handleChange}
          value={formData.infraestrutura || ''}
          className="rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dias_preferencia">Dias e horários preferenciais</Label>
        <select
          name="dias_preferencia"
          required
          onChange={handleChange}
          value={formData.dias_preferencia || ''}
          className="bg-black border border-white/20 text-white rounded-md px-4 py-2 w-full"
        >
          <option value="">Selecione...</option>
          <option value="Seg, Qua, Sex - Manhã">Seg, Qua, Sex - Manhã</option>
          <option value="Ter e Qui - Tarde">Ter e Qui - Tarde</option>
          <option value="Sábado - Tarde">Sábado - Tarde</option>
          <option value="Outro">Outro (Verificar disponibilidades)</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone para contato</Label>
        <Input
          name="telefone"
          required
          placeholder="Ex: (11) 91234-5678"
          onChange={handleSanitizedChange}
          value={formData.telefone || ''}
          className="rounded-md"
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="parceria"
          onCheckedChange={(checked) =>
            setFormData((prev: any) => ({ ...prev, quer_parceria: !!checked }))
          }
        />
        <Label htmlFor="parceria">Deseja realizar parceria educativa ou de divulgação?</Label>
      </div>
    </>
  )
}
