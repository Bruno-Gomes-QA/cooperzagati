'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import type { Trucks } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
  caminhaoParaEditar?: Trucks
}

export function TruckFormDialog({ open, onClose, caminhaoParaEditar }: Props) {
  const isEdit = !!caminhaoParaEditar

  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    capacity_kg: '',
    notes: '',
  })

  useEffect(() => {
    if (caminhaoParaEditar) {
      setFormData({
        name: caminhaoParaEditar.name,
        plate: caminhaoParaEditar.plate,
        capacity_kg: caminhaoParaEditar.capacity_kg.toString(),
        notes: caminhaoParaEditar.notes || '',
      })
    } else {
      setFormData({ name: '', plate: '', capacity_kg: '', notes: '' })
    }
  }, [caminhaoParaEditar])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert('Usuário não autenticado')

    const payload = {
      ...formData,
      capacity_kg: Number(formData.capacity_kg),
    }

    const { error } = isEdit
      ? await supabase.from('trucks').update(payload).eq('id', caminhaoParaEditar!.id)
      : await supabase.from('trucks').insert(payload)

    if (error) {
      alert('Erro ao salvar caminhão')
    } else {
      onClose()
    }
  }

  const fields = [
    { key: 'name', label: 'Modelo' },
    { key: 'plate', label: 'Placa' },
    { key: 'capacity_kg', label: 'Capacidade em KG' },
    { key: 'notes', label: 'Observações' },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-green-500">
            {isEdit ? 'Editar Caminhão' : 'Novo Caminhão'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <Label className="text-white mb-1 block">{label}</Label>
              <Input
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                required={key !== 'notes'}
                className="bg-zinc-900 border border-white/20 text-white"
              />
            </div>
          ))}

          <div className="text-right pt-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {isEdit ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
