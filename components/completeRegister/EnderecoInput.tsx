'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultadoEndereco } from '@/components/ColetaForm/ResultadoEndereco'
import { HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

interface Endereco {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

interface Props {
  emCasa: boolean | null
  setEmCasa: (value: boolean | null) => void
  cep: string
  setCep: (value: string) => void
  endereco: Endereco | null
  setEndereco: (value: Endereco | null) => void
}

export function EnderecoInput({
  emCasa,
  setEmCasa,
  cep,
  setCep,
  endereco,
  setEndereco,
}: Props) {
  const [erro, setErro] = useState<string | null>(null)

  const handlePermissaoLocalizacao = () => {
    if (!navigator.geolocation) {
      setErro('Seu navegador não suporta geolocalização.')
      setEmCasa(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          )
          const data = await res.json()

          if (data?.address) {
            setEndereco({
              logradouro: data.address.road || data.address.pedestrian || '',
              bairro: data.address.neighbourhood || data.address.suburb || '',
              localidade:
                data.address.city ||
                data.address.town ||
                data.address.village ||
                '',
              uf: data.address.state || '',
            })
            setErro(null)
          } else {
            setErro('Erro ao buscar sua localização. Por favor, informe o CEP.')
            setEmCasa(false)
            setEndereco(null)
          }
        } catch {
          setErro('Erro ao buscar sua localização. Por favor, informe o CEP.')
          setEmCasa(false)
          setEndereco(null)
        }
      },
      () => {
        setErro('Permissão negada. Por favor, informe o CEP.')
        setEmCasa(false)
        setEndereco(null)
      }
    )
  }

  const buscarEnderecoPorCep = async (cepDigitado: string) => {
    const cepLimpo = cepDigitado.replace(/\D/g, '')
    setCep(cepLimpo)

    if (cepLimpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await res.json()

        if (!data.erro) {
          setEndereco({
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
          })
          setErro(null)
        } else {
          setEndereco(null)
          setErro('CEP inválido.')
        }
      } catch {
        setEndereco(null)
        setErro('Erro ao buscar endereço pelo CEP.')
      }
    } else {
      setEndereco(null)
    }
  }

  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-center gap-2">
        <Label>Gostaria de usar sua localização atual?</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="w-4 h-4 text-white/60 cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="bg-zinc-800 text-white max-w-xs">
            Utilizamos sua localização para sugerir automaticamente o ponto de coleta mais próximo.
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant={emCasa === true ? 'default' : 'outline'}
          onClick={() => {
            setEmCasa(true)
            handlePermissaoLocalizacao()
          }}
          className="rounded-full"
        >
          Sim
        </Button>
        <Button
          type="button"
          variant={emCasa === false ? 'default' : 'outline'}
          onClick={() => setEmCasa(false)}
          className="rounded-full"
        >
          Não
        </Button>
      </div>

      {erro && <p className="text-red-400 text-sm">{erro}</p>}

      {emCasa === false && (
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input
            name="cep"
            value={cep}
            onChange={(e) => buscarEnderecoPorCep(e.target.value)}
            className="rounded-md"
            placeholder="00000-000"
          />
        </div>
      )}

      {endereco && <ResultadoEndereco endereco={endereco} />}
    </div>
  )
}
