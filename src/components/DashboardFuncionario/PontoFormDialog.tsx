'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { Plus } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  pontoParaEditar?: any
}

export function PontoFormDialog({ open, onClose, pontoParaEditar }: Props) {
  const isEdicao = !!pontoParaEditar

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    postal_code: '',
    location_type: '',
    capacity_kg: '',
    notes: '',
  })

  useEffect(() => {
    if (pontoParaEditar) {
      setFormData({
        name: pontoParaEditar.name || '',
        address: pontoParaEditar.address || '',
        number: pontoParaEditar.number || '',
        neighborhood: pontoParaEditar.neighborhood || '',
        city: pontoParaEditar.city || '',
        state: pontoParaEditar.state || '',
        postal_code: pontoParaEditar.postal_code || '',
        location_type: pontoParaEditar.location_type || '',
        capacity_kg: pontoParaEditar.capacity_kg?.toString() || '',
        notes: pontoParaEditar.notes || '',
      })
    } else {
      resetForm()
    }
  }, [pontoParaEditar])

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      postal_code: '',
      location_type: '',
      capacity_kg: '',
      notes: '',
    })
  }

  const buscarEnderecoPorCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '')

    if (cepLimpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await res.json()

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || '',
          }))
        }
      } catch (err) {
        console.error('Erro ao buscar endereço via CEP:', err)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'postal_code') {
      buscarEnderecoPorCep(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) {
      alert('Usuário não autenticado.')
      return
    }

    const payload = {
      ...formData,
      capacity_kg: Number(formData.capacity_kg),
      ...(isEdicao ? {} : { created_by: user.id }), // apenas no insert
    }

    const { error } = isEdicao
      ? await supabase.from('collection_points').update(payload).eq('id', pontoParaEditar.id)
      : await supabase.from('collection_points').insert(payload)

    if (error) {
      console.error(error)
      alert('Erro ao salvar ponto')
    } else {
      onClose()
      resetForm()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-green-500">
            {isEdicao ? 'Editar ponto de coleta' : 'Novo ponto de coleta'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Nome', name: 'name' },
            { label: 'CEP', name: 'postal_code' },
            { label: 'Logradouro', name: 'address' },
            { label: 'Número', name: 'number' },
            { label: 'Bairro', name: 'neighborhood' },
            { label: 'Cidade', name: 'city' },
            { label: 'UF', name: 'state' },
            { label: 'Tipo de local', name: 'location_type' },
            { label: 'Capacidade (kg)', name: 'capacity_kg' },
          ].map(({ label, name }) => (
            <div key={name}>
              <Label className="text-white mb-1 block">{label}</Label>
              <Input
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="bg-zinc-900 border border-white/20 text-white"
                required
              />
            </div>
          ))}

          <div className="sm:col-span-2">
            <Label className="text-white mb-1 block">Ponto de referência / Observações</Label>
            <Input
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="bg-zinc-900 border border-white/20 text-white"
              required
            />
          </div>

          <div className="sm:col-span-2 text-right pt-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {isEdicao ? 'Salvar alterações' : 'Criar ponto'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
