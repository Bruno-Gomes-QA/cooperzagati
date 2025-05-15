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

export function FormularioPF({ formData, setFormData, handleChange }: Props) {
  const sanitizeInput = (name: string, value: string) => {
    switch (name) {
      case 'nome_completo':
        return value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
      case 'cpf':
        return value.replace(/\D/g, '').slice(0, 11)
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
        <Label htmlFor="nome_completo">Nome completo</Label>
        <Input
          name="nome_completo"
          required
          value={formData.nome_completo || ''}
          onChange={handleSanitizedChange}
          className="rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf">CPF (opcional)</Label>
        <Input
          name="cpf"
          placeholder="Ex: 12345678900"
          value={formData.cpf || ''}
          onChange={handleSanitizedChange}
          className="rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone para contato</Label>
        <Input
          name="telefone"
          required
          placeholder="Ex: 11912345678"
          value={formData.telefone || ''}
          onChange={handleSanitizedChange}
          className="rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="moradores">Quantas pessoas moram com você?</Label>
        <select
          name="moradores"
          required
          value={formData.moradores || ''}
          onChange={handleChange}
          className="bg-black border border-white/20 text-white rounded-md px-4 py-2 w-full"
        >
          <option value="">Selecione...</option>
          <option value="1-3">1 à 3 pessoas</option>
          <option value="4-6">4 à 6 pessoas</option>
          <option value="7+">7 ou mais</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="material">Tipo de material que mais recicla?</Label>
        <select
          name="material"
          required
          value={formData.material || ''}
          onChange={handleChange}
          className="bg-black border border-white/20 text-white rounded-md px-4 py-2 w-full"
        >
          <option value="">Selecione...</option>
          <option value="Plástico">Plástico</option>
          <option value="Papelão">Papelão</option>
          <option value="Latinha">Latinha</option>
          <option value="Vidro">Vidro</option>
          <option value="Orgânico">Orgânico</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="lembretes"
          onCheckedChange={(checked) =>
            setFormData((prev: any) => ({ ...prev, receber_dicas: !!checked }))
          }
        />
        <Label htmlFor="lembretes">Deseja receber lembretes ou dicas?</Label>
      </div>
    </>
  )
}
