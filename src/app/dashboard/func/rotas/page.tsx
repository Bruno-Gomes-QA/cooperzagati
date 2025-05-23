'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCaminhoes } from '@/hooks/useCaminhoes'
import { PontoColeta } from '@/types'
import { supabase } from '@/lib/supabase'
import { Truck, MapPin, Ban, DollarSign, Thermometer, ArrowLeftRight, Clock, Fuel, AlertTriangle } from 'lucide-react'

interface RotaResumo {
  quantidade_viagens: number
  material_total_kg: number
  distancia_total_km: number
  tempo_estimado_min: number
  litros_estimados: number
  custo_estimado_reais: number
  capacidade_kg: number
  caminhao_id: string
  capacidade_utilizada_percent: number
  pontos_nao_visitados: string[] | null
}

interface Viagem {
  ordem: number
  pontos_visitados: {
    id: string
    coletado_kg: number
    distancia_km: number
    duracao_min: number
  }[]
  distancia_km: number
  duracao_min: number
  retorno: boolean
}

const COOPER_ID = 'ddc0d879-58ae-499b-b9eb-aad1671dd26c'

export default function RotasPage() {
  const [pontos, setPontos] = useState<PontoColeta[]>([])
  const { trucks } = useCaminhoes()
  const [pontoSelecionados, setPontoSelecionados] = useState<string[]>([])
  const [caminhaoId, setCaminhaoId] = useState<string>('')
  const [viagens, setViagens] = useState<Viagem[]>([])
  const [resumo, setResumo] = useState<RotaResumo | null>(null)
  const [gerandoRota, setGerandoRota] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const carregarPontos = async () => {
      const { data, error } = await supabase
        .from('collection_points')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        const filtrados = (data as PontoColeta[]).filter(p => p.id !== COOPER_ID)
        setPontos(filtrados)
        setPontoSelecionados(prev => prev.filter(id => id !== COOPER_ID))
      }
    }

    carregarPontos()
  }, [])

  const togglePonto = (id: string) => {
    setPontoSelecionados((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const gerarRota = async () => {
    if (!caminhaoId || pontoSelecionados.length === 0) return
    setGerandoRota(true)
    setErro(null)
    try {
      const res = await fetch('https://cooperzagati-api.vercel.app/gerar-rota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          truck_id: caminhaoId,
          ponto_ids: pontoSelecionados.filter(id => id !== COOPER_ID),
        })
      })

      const raw = await res.text()
      if (!res.ok) throw new Error('Erro HTTP: ' + res.status)
      const data = JSON.parse(raw)
      setViagens(data.viagens)
      setResumo(data.resumo)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido')
      console.error('Erro na rota:', error)
      setErro(error.message)
    } finally {
      setGerandoRota(false)
    }
  }

  return (
    <div className="min-h-screen w-full space-y-6">
      <h1 className="text-2xl font-bold text-green-500">Gerar Rota</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Pontos Selecionados</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-white space-y-4">
            <div className="flex flex-wrap gap-2">
              {pontoSelecionados.length === 0 ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ban className="w-4 h-4" /> Nenhum ponto selecionado.
                </div>
              ) : (
                pontos.filter(p => pontoSelecionados.includes(p.id!)).map(p => (
                  <span key={p.id} className="px-3 py-1 rounded-full bg-green-900 text-green-300 border border-green-600">
                    {p.name}
                  </span>
                ))
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-green-500 text-green-400">Selecionar Pontos</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] min-w-[100vh] overflow-y-auto space-y-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Pontos de Coleta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {pontos.map((p) => {
                      const endereco = `${p.address}, ${p.number} - ${p.neighborhood}, ${p.city} - ${p.state}`
                      return (
                        <div key={p.id} className="border border-zinc-800 rounded-md p-3 text-sm text-white flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <Checkbox
                              checked={pontoSelecionados.includes(p.id!)}
                              onCheckedChange={() => togglePonto(p.id!)}
                            />
                            <div>
                              <p className="font-medium">{p.name}</p>
                              <p className="text-xs text-muted-foreground max-w-xs truncate">{endereco}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-green-400 text-sm">{p.capacity_kg} kg/sem</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-blue-400"
                              onClick={() =>
                                window.open(
                                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`,
                                  '_blank'
                                )
                              }
                            >
                              <MapPin className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Caminhão Selecionado</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-white space-y-4">
            {caminhaoId ? (
              <p>{trucks.find(t => t.id === caminhaoId)?.name} - <span className="text-green-400">{trucks.find(t => t.id === caminhaoId)?.capacity_kg} kg</span></p>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Ban className="w-4 h-4" /> Nenhum caminhão selecionado.
              </div>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-green-500 text-green-400">Selecionar Caminhão</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Caminhões Disponíveis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {trucks.map((t) => (
                      <label key={t.id} className="flex items-center justify-between border border-zinc-800 rounded-md p-3 text-sm text-white">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="truck"
                            value={t.id}
                            checked={caminhaoId === t.id}
                            onChange={() => setCaminhaoId(t.id!)}
                          />
                          <span className="font-medium">{t.name}</span>
                        </div>
                        <span className="text-green-400">{t.capacity_kg} kg</span>
                      </label>
                    ))}
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <Button onClick={gerarRota} disabled={gerandoRota} className="bg-green-600 hover:bg-green-700">
        {gerandoRota ? 'Gerando rota...' : 'Gerar Rota'}
      </Button>

      {erro && <p className="text-red-500 font-medium">Erro: {erro}</p>}

      {resumo && (
        <Card className="mt-6 border border-green-500">
          <CardHeader>
            <CardTitle className="text-green-500">Resumo da Rota</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-white">
              <Truck className="w-5 h-5 text-green-400" /> {resumo.quantidade_viagens} viagem(ns)
            </div>
            <div className="flex items-center gap-2 text-white">
              <Thermometer className="w-5 h-5 text-green-400" /> {resumo.material_total_kg} kg de material
            </div>
            <div className="flex items-center gap-2 text-white">
              <ArrowLeftRight className="w-5 h-5 text-green-400" /> {resumo.distancia_total_km} km percorridos
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-green-400" /> {Math.round(resumo.tempo_estimado_min)} minutos
            </div>
            <div className="flex items-center gap-2 text-white">
              <Fuel className="w-5 h-5 text-green-400" /> {resumo.litros_estimados} litros de diesel
            </div>
            <div className="flex items-center gap-2 text-white">
              <DollarSign className="w-5 h-5 text-green-400" /> R$ {resumo.custo_estimado_reais}
            </div>
            {resumo.pontos_nao_visitados && (
              <div className="col-span-full mt-4">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertTriangle className="w-5 h-5" /> Pontos não visitados
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {resumo.pontos_nao_visitados.map((id) => {
                    const ponto = pontos.find(p => p.id === id)
                    const endereco = ponto ? `${ponto.address}, ${ponto.number} - ${ponto.neighborhood}, ${ponto.city} - ${ponto.state}` : id
                    return (
                      <div key={id} className="border border-red-600/50 bg-red-900/20 rounded-lg px-4 py-3 text-sm text-white space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-300" />
                          <span className="font-medium text-red-300">{ponto?.name || id}</span>
                        </div>
                        <p className="text-muted-foreground ml-6 text-xs">{endereco}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {viagens.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-green-500">Detalhes das Viagens</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {viagens.map((viagem) => (
              <div key={viagem.ordem} className="border border-green-800 rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-bold text-green-300">Viagem {viagem.ordem}</h3>
                {viagem.pontos_visitados.map((pontoVisitado, idx) => {
                  const ponto = pontos.find(p => p.id === pontoVisitado.id)
                  const endereco = ponto
                    ? `${ponto.address}, ${ponto.number} - ${ponto.neighborhood}, ${ponto.city} - ${ponto.state}`
                    : 'Endereço não encontrado'

                  return (
                    <div key={idx} className="border border-zinc-700 rounded-md p-4 space-y-2">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <span className="font-semibold">{ponto?.name || pontoVisitado.id}</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{endereco}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white mt-1">
                        <Thermometer className="w-5 h-5 text-green-400" /> {pontoVisitado.coletado_kg} kg
                        <ArrowLeftRight className="w-5 h-5 text-green-400" /> {pontoVisitado.distancia_km} km
                        <Clock className="w-5 h-5 text-green-400" /> {Math.round(pontoVisitado.duracao_min)} min
                      </div>
                    </div>
                  )
                })}
                <div className="text-sm text-yellow-300 flex gap-2 items-center mt-2">
                  <ArrowLeftRight className="w-4 h-4" />
                  Retorno à base incluso
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
