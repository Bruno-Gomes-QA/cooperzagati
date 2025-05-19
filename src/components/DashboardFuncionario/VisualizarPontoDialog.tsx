'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  ponto: any
}

export function VisualizarPontoDialog({ ponto }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-blue-400 hover:bg-blue-800/10"
        >
          <Eye className="w-4 h-4 mr-1" />
          Visualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl text-white">
        <DialogHeader>
          <DialogTitle className="text-green-400">
            Detalhes do ponto de coleta
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Campo label="Nome" valor={ponto.name} />
          <Campo label="CEP" valor={ponto.postal_code} />
          <Campo label="Logradouro" valor={ponto.address} />
          <Campo label="Número" valor={ponto.number} />
          <Campo label="Bairro" valor={ponto.neighborhood} />
          <Campo label="Cidade" valor={ponto.city} />
          <Campo label="UF" valor={ponto.state} />
          <Campo label="Tipo de Local" valor={ponto.location_type} />
          <Campo label="Capacidade (kg)" valor={ponto.capacity_kg} />
          <Campo label="Observações" valor={ponto.notes} />
          <Campo
            label="Criado em"
            valor={new Date(ponto.created_at).toLocaleDateString('pt-BR')}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Campo({ label, valor }: { label: string; valor: any }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm">{valor || '-'}</p>
    </div>
  )
}
