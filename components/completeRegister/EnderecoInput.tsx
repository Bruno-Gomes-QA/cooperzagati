'use client'

import { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultadoEndereco } from '@/components/ColetaForm/ResultadoEndereco'

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

export function EnderecoInput({ emCasa, setEmCasa, cep, setCep, endereco, setEndereco }: Props) {
  const handlePermissaoLocalizacao = () => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        )
        const data = await res.json()
        if (data?.address) {
          const address = data.address
          setEndereco({
            logradouro: address.road || address.pedestrian || '',
            bairro: address.neighbourhood || address.suburb || '',
            localidade: address.city || address.town || address.village || '',
            uf: address.state || '',
          })
        }
      },
      () => setEndereco(null)
    )
  }

  const buscarEnderecoPorCep = async (cepDigitado: string) => {
    const cepLimpo = cepDigitado.replace(/\D/g, '')
    setCep(cepLimpo)

    if (cepLimpo.length === 8) {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setEndereco({
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        })
      } else {
        setEndereco(null)
      }
    } else {
      setEndereco(null)
    }
  }

  return (
    <div className="space-y-4 pt-6">
      <Label>Gostaria de user sua localização atual?</Label>
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

      {emCasa === false && (
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input
            name="cep"
            value={cep}
            onChange={(e) => buscarEnderecoPorCep(e.target.value)}
            className="rounded-md"
          />
        </div>
      )}

      {endereco && <ResultadoEndereco endereco={endereco} />}
    </div>
  )
}
