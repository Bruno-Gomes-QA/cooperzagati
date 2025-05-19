'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import type { PontoColeta } from '@/types'

interface Props {
  search: string
  onEdit: (ponto: PontoColeta) => void
}

export function PontosLista({ search, onEdit }: Props) {
  const [pontos, setPontos] = useState<PontoColeta[]>([])

  useEffect(() => {
    const carregar = async () => {
      const { data } = await supabase.from('collection_points').select('*')
      setPontos((data || []) as PontoColeta[])
    }
    carregar()
  }, [])

  const pontosFiltrados = pontos.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  if (pontosFiltrados.length === 0) {
    return <EmptyState message="Nenhum ponto de coleta cadastrado." />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pontosFiltrados.map((ponto) => (
        <div
          key={ponto.id}
          className="border border-green-600 rounded-xl p-4 bg-[#0a0a0a] text-white space-y-2"
        >
          <div>
            <strong>{ponto.name}</strong>
            <p className="text-sm text-white/80">
              {ponto.address}, {ponto.number} - {ponto.neighborhood}, {ponto.city} - {ponto.state}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(ponto)}>
            <Pencil className="w-4 h-4 mr-2" /> Editar
          </Button>
        </div>
      ))}
    </div>
  )
}
