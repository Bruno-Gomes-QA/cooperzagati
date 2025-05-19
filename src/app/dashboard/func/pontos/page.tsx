'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { usePontosColeta } from '@/hooks/usePontosColeta'
import { PontoTable } from '@/components/DashboardFuncionario/PontoTable'
import { PontoFormDialog } from '@/components/DashboardFuncionario/PontoFormDialog'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import type { PontoColeta } from '@/types'

export default function PontosPage() {
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [pontoParaEditar, setPontoParaEditar] = useState<PontoColeta | undefined>(undefined)
  const { pontos, loading, refetch } = usePontosColeta(search)

  const handleFecharForm = () => {
    setShowForm(false)
    setPontoParaEditar(undefined)
    refetch()
  }

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Input
            placeholder="Buscar pontos de coleta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-sm"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <MapPin className="w-4 h-4" />
            Novo ponto
          </Button>
        </div>

        {loading ? (
          <p className="text-white">Carregando...</p>
        ) : pontos.length === 0 ? (
          <EmptyState message="Nenhum ponto de coleta encontrado" />
        ) : (
          <PontoTable
            pontos={pontos}
            onEdit={(ponto) => {
              setPontoParaEditar(ponto)
              setShowForm(true)
            }}
            refetch={refetch}
          />
        )}

        {showForm && (
          <PontoFormDialog
            open={showForm}
            onClose={handleFecharForm}
            pontoParaEditar={pontoParaEditar}
          />
        )}
      </div>
    </div>
  )
}
