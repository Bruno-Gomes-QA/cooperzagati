'use client'

import { useState } from 'react'
import { Trash, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import type { Trucks } from '@/types'
import { supabase } from '@/lib/supabase'

interface Props {
  caminhoes: Trucks[]
  onEdit: (c: Trucks) => void
  refetch: () => void
}

export function TruckTable({ caminhoes, onEdit, refetch }: Props) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null)

  const excluir = async () => {
    if (!selectedTruckId) return
    const { error } = await supabase.from('trucks').delete().eq('id', selectedTruckId)
    if (!error) refetch()
    else alert('Erro ao excluir')
    setConfirmDialogOpen(false)
  }

  if (caminhoes.length === 0) {
    return <div className="text-white opacity-70 text-sm">Nenhum caminhão encontrado.</div>
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full border border-green-700">
        <Table className="text-white"
        style={{ '--radius': '0px' } as React.CSSProperties }>
          <TableHeader className="bg-green-800 rounded-t-md">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Placa</TableHead>
              <TableHead>Capacidade</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caminhoes.map(c => (
              <TableRow key={c.id} className="hover:bg-zinc-800/40">
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.plate}</TableCell>
                <TableCell>{c.capacity_kg}kg</TableCell>
                <TableCell className="max-w-sm truncate" title={c.notes || '-'}>
                  {c.notes || '-'}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={() => onEdit(c)} size="sm" variant="outline" className="border-white/30">
                    <Pencil className="w-4 h-4 mr-1" /> Editar
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedTruckId(c.id!)
                      setConfirmDialogOpen(true)
                    }}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash className="w-4 h-4 mr-1" /> Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza que deseja excluir este caminhão?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={excluir}>Sim, excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </div>
  </div>
  )
}
