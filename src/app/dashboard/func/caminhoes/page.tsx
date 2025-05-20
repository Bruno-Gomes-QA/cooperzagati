'use client'

import { useState } from 'react'
import { TruckFormDialog } from '@/components/DashboardFuncionario/TruckFormDialog'
import { TruckTable } from '@/components/DashboardFuncionario/TruckTable'
import { useCaminhoes } from '@/hooks/useCaminhoes'
import type { Trucks } from '@/types'
import { Button } from '@/components/ui/button'
import { Truck } from 'lucide-react'

export default function CaminhoesPage() {
  const { trucks, refetch } = useCaminhoes()
  const [showForm, setShowForm] = useState(false)
  const [caminhaoParaEditar, setCaminhaoParaEditar] = useState<Trucks | undefined>()

  const handleFecharForm = () => {
    setShowForm(false)
    setCaminhaoParaEditar(undefined)
    refetch()
  }

  return (
    <div className="min-h-screen w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-500">Gerenciar Caminhões</h1>
        <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700 rounded-full">
          <Truck className="w-4 h-4 mr-1" /> Novo Caminhão
        </Button>
      </div>

      <TruckTable caminhoes={trucks} onEdit={(c) => {
        setCaminhaoParaEditar(c)
        setShowForm(true)
      }} refetch={refetch} />

      {showForm && (
        <TruckFormDialog
          open={showForm}
          onClose={handleFecharForm}
          caminhaoParaEditar={caminhaoParaEditar}
        />
      )}
    </div>
  )
}