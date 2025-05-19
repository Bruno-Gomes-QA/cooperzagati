'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Trash, Pencil, MapPin } from 'lucide-react'
import { VisualizarPontoDialog } from './VisualizarPontoDialog'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { PontoColeta } from '@/types'

interface Props {
  pontos: PontoColeta[]
  onEdit: (ponto: PontoColeta) => void
  refetch: () => void
}

export function PontoTable({ pontos, onEdit, refetch }: Props) {
  const [pontoParaExcluir, setPontoParaExcluir] = useState<PontoColeta | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const handleConfirmDelete = (ponto: PontoColeta) => {
    setPontoParaExcluir(ponto)
    setConfirmDialogOpen(true)
  }

  const excluirPonto = async () => {
    if (!pontoParaExcluir) return

    const { error } = await supabase
      .from('collection_points')
      .delete()
      .eq('id', pontoParaExcluir.id)

    if (!error) {
      refetch()
      setConfirmDialogOpen(false)
      setPontoParaExcluir(null)
    } else {
      alert('Erro ao excluir ponto')
    }
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="w-full border border-green-700">
          <Table
            className="w-full text-white"
            style={{ '--radius': '0px' } as React.CSSProperties }
          >
            <TableHeader className="bg-green-800">
              <TableRow>
                <TableHead className="text-white">Nome</TableHead>
                <TableHead className="text-white">Endereço</TableHead>
                <TableHead className="text-white">Capacidade (kg)</TableHead>
                <TableHead className="text-white">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pontos.map((ponto) => {
                const endereco = `${ponto.address}, ${ponto.number} - ${ponto.neighborhood}, ${ponto.city} - ${ponto.state}`

                return (
                  <TableRow key={ponto.id} className="hover:bg-green-900/10">
                    <TableCell>{ponto.name}</TableCell>
                    <TableCell className="max-w-[500px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>{endereco}</span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs break-words">
                          {endereco}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{ponto.capacity_kg}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-400"
                        onClick={() => onEdit(ponto)}
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Editar
                      </Button>

                      <VisualizarPontoDialog ponto={ponto} />

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-400"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`,
                            '_blank'
                          )
                        }
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500"
                        onClick={() => handleConfirmDelete(ponto)}
                      >
                        <Trash className="w-4 h-4 mr-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <p className="text-sm text-white/80">
            Tem certeza que deseja excluir o ponto{' '}
            <strong>{pontoParaExcluir?.name}</strong>?
          </p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              className="rounded-full"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={excluirPonto}
              className="rounded-full"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
