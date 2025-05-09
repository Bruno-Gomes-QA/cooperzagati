'use client'

import { useState } from 'react'
import { FormHeader } from './FormHeader'
import { ImagemLateral } from './ImagemLateral'
import { FormularioEndereco } from './FormularioEndereco'
import { ResultadoEndereco } from './ResultadoEndereco'

export function ColetaForm() {
  const [emCasa, setEmCasa] = useState<null | boolean>(null)
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState<{
    logradouro: string
    bairro: string
    localidade: string
    uf: string
  } | null>(null)

  const reverseGeocode = async (
    lat: number,
    lon: number
  ): Promise<{
    logradouro: string
    bairro: string
    localidade: string
    uf: string
  } | null> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      )
      const data = await res.json()

      if (data?.address) {
        const address = data.address

        return {
          logradouro: address.road || address.pedestrian || '',
          bairro: address.neighbourhood || address.suburb || '',
          localidade: address.city || address.town || address.village || '',
          uf: address.state || '',
        }
      }

      return null
    } catch (err) {
      console.error('Erro ao buscar endereço reverso:', err)
      return null
    }
  }

  const handlePermissaoLocalizacao = () => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const result = await reverseGeocode(
          position.coords.latitude,
          position.coords.longitude
        )

        if (result) {
          setEndereco(result)
        } else {
          setEndereco(null)
        }
      },
      () => {
        setEndereco(null)
      }
    )
  }

  const handleSelecao = (valor: boolean) => {
    setEmCasa(valor)
    if (valor) {
      setEndereco(null)
      handlePermissaoLocalizacao()
    }
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
        } else {
          setEndereco(null)
        }
      } catch (err) {
        console.error('Erro ao buscar CEP:', err)
        setEndereco(null)
      }
    } else {
      setEndereco(null)
    }
  }

  return (
    <section className="w-full px-4 py-12 max-w-6xl mx-auto">
      <FormHeader />

      <div className="bg-[#0a0a0a] border border-green-600 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <ImagemLateral />

        <FormularioEndereco
          emCasa={emCasa}
          setEmCasa={setEmCasa}
          handleSelecao={handleSelecao}
          cep={cep}
          buscarEnderecoPorCep={buscarEnderecoPorCep}
          endereco={endereco}
        />
      </div>
    </section>
  )
}
