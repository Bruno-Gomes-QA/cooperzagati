'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

export function PontoFormFields({ ponto, onClose }: { ponto: any, onClose: () => void }) {
  const { usuario } = useAuth()

  const [cep, setCep] = useState(ponto?.postal_code || '')
  const [name, setName] = useState(ponto?.name || '')
  const [address, setAddress] = useState(ponto?.address || '')
  const [number, setNumber] = useState(ponto?.number || '')
  const [neighborhood, setNeighborhood] = useState(ponto?.neighborhood || '')
  const [city, setCity] = useState(ponto?.city || '')
  const [state, setState] = useState(ponto?.state || '')
  const [locationType, setLocationType] = useState(ponto?.location_type || '')
  const [capacityKg, setCapacityKg] = useState(ponto?.capacity_kg || '')
  const [notes, setNotes] = useState(ponto?.notes || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const buscarPorCep = async () => {
      const cepLimpo = cep.replace(/\D/g, '')
      if (cepLimpo.length !== 8) return

      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await res.json()

        if (!data.erro) {
          setAddress(data.logradouro || '')
          setNeighborhood(data.bairro || '')
          setCity(data.localidade || '')
          setState(data.uf || '')
        }
      } catch (e) {
        console.error('Erro ao buscar CEP:', e)
      }
    }

    buscarPorCep()
  }, [cep])

  const salvar = async () => {
    if (!usuario?.id) return alert('Usuário não autenticado')

    if (!name || !cep || !address || !number || !neighborhood || !city || !state || !locationType || !capacityKg) {
      return alert('Preencha todos os campos obrigatórios.')
    }

    if (isNaN(Number(capacityKg))) {
      return alert('Capacidade deve ser um número.')
    }

    setLoading(true)

    const payload = {
      name,
      postal_code: cep,
      address,
      number,
      neighborhood,
      city,
      state,
      location_type: locationType,
      capacity_kg: parseInt(capacityKg),
      notes,
      created_by: usuario.id,
    }

    const { error } = ponto?.id
      ? await supabase.from('collection_points').update(payload).eq('id', ponto.id)
      : await supabase.from('collection_points').insert(payload)

    setLoading(false)

    if (error) {
      console.error(error)
      alert('Erro ao salvar o ponto.')
    } else {
      onClose()
    }
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); salvar() }}
      className="space-y-6 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <Label className="mb-1 block">CEP</Label>
          <Input className="w-full" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="00000-000" />
        </div>
        <div className="w-full">
          <Label className="mb-1 block">Nome do ponto</Label>
          <Input className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="w-full">
          <Label className="mb-1 block">Logradouro</Label>
          <Input className="w-full" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="w-full">
          <Label className="mb-1 block">Número</Label>
          <Input className="w-full" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className="w-full">
          <Label className="mb-1 block">Bairro</Label>
          <Input className="w-full" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
        </div>
        <div className="w-full">
          <Label className="mb-1 block">Cidade</Label>
          <Input className="w-full" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="w-full">
          <Label className="mb-1 block">UF</Label>
          <Input className="w-full" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="w-full">
          <Label className="mb-1 block">Tipo de Local</Label>
          <select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            className="w-full bg-black border border-white/20 text-white rounded-md px-4 py-2"
          >
            <option value="">Selecione...</option>
            <option value="Escola">Escola</option>
            <option value="Empresa">Empresa</option>
            <option value="Condomínio">Condomínio</option>
            <option value="Hospital">Hospital</option>
            <option value="ONG">ONG</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="w-full">
          <Label className="mb-1 block">Capacidade estimada (kg por semana)</Label>
          <Input
            className="w-full"
            type="number"
            value={capacityKg}
            onChange={(e) => setCapacityKg(e.target.value)}
          />
        </div>
        <div className="md:col-span-2 w-full">
          <Label className="mb-1 block">Ponto de referência / Observações</Label>
          <Textarea
            className="w-full"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Em frente ao portão lateral..."
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white rounded-full">
          {ponto?.id ? 'Salvar alterações' : 'Criar ponto'}
        </Button>
      </div>
    </form>
  )
}
