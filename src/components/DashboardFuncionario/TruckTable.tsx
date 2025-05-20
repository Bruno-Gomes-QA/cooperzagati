'use client'

import { Trash, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Trucks } from '@/types'
import { supabase } from '@/lib/supabase'

interface Props {
  caminhoes: Trucks[]
  onEdit: (c: Trucks) => void
  refetch: () => void
}

export function TruckTable({ caminhoes, onEdit, refetch }: Props) {
  const excluir = async (id: string) => {
    const { error } = await supabase.from('trucks').delete().eq('id', id)
    if (!error) refetch()
    else alert('Erro ao excluir')
  }

  if (caminhoes.length === 0) {
    return <div className="text-white opacity-70 text-sm">Nenhum caminhão encontrado.</div>
  }

  return (
    <Table className="text-white">
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
            <TableCell>{c.notes || '-'}</TableCell>
            <TableCell className="flex gap-2">
              <Button onClick={() => onEdit(c)} size="sm" variant="outline">
                <Pencil className="w-4 h-4 mr-1" /> Editar
              </Button>
              <Button onClick={() => excluir(c.id!)} size="sm" variant="destructive">
                <Trash className="w-4 h-4 mr-1" /> Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}