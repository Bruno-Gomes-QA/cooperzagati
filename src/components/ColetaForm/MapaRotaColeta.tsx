'use client'

import { useEffect, useRef, useState } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { CarFront, Timer } from 'lucide-react'

interface Endereco {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

interface PontoColeta {
  nome: string
  endereco: string
  lat: number
  lng: number
}

interface MapaRotaColetaProps {
  endereco: Endereco
}

export function MapaRotaColeta({ endereco }: MapaRotaColetaProps) {
  const mapRef = useRef<google.maps.Map | null>(null)
  const [distancia, setDistancia] = useState<string | null>(null)
  const [duracao, setDuracao] = useState<string | null>(null)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [pontoMaisProximo, setPontoMaisProximo] = useState<PontoColeta | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places', 'geometry'],
  })

  const pontos: PontoColeta[] = [
    {
      nome: 'Cooperativa Principal',
      endereco: 'R. Porfírio Herdeiro, 440 - Parque Industrial das Oliveiras, Taboão da Serra - SP, 06765-480',
      lat: -23.6214828,
      lng: -46.7771148,
    },
    {
      nome: 'Eco ponto - Estr. das Olarias',
      endereco: 'Eco ponto - Estr. das Olarias, 980 - Jardim Triangulo, Taboão da Serra - SP, 06775-005',
      lat: -23.6338895,
      lng: -46.7920879,
    },
    {
      nome: 'Eco ponto - R. José Milani',
      endereco: 'R. José Milani, 275 - Jardim Irapua, Taboão da Serra - SP, 06766-420',
      lat: -23.6235937,
      lng: -46.7795843,
    },
  ]

  useEffect(() => {
    const geocodeEndereco = async () => {
      const address = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}`
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]?.geometry.location) {
          const location = results[0].geometry.location
          const latLng = { lat: location.lat(), lng: location.lng() }
          setUserLocation(latLng)
        }
      })
    }
    if (isLoaded) geocodeEndereco()
  }, [endereco, isLoaded])

  useEffect(() => {
    const calcularDistancia = async () => {
      if (!userLocation) return

      const distances: {
        ponto: PontoColeta
        distancia: number
        duracao: string
        rota: google.maps.DirectionsResult
      }[] = []

      for (const ponto of pontos) {
        const directionsService = new google.maps.DirectionsService()
        try {
          const result = await directionsService.route({
            origin: userLocation,
            destination: { lat: ponto.lat, lng: ponto.lng },
            travelMode: google.maps.TravelMode.DRIVING,
          })

          const leg = result.routes[0]?.legs[0]
          if (leg) {
            distances.push({
              ponto,
              distancia: leg.distance?.value || Infinity,
              duracao: leg.duration?.text || '',
              rota: result,
            })
          }
        } catch (err) {
          console.error('Erro ao calcular rota:', err)
        }
      }

      const maisProximo = distances.sort((a, b) => a.distancia - b.distancia)[0]
      if (maisProximo) {
        setPontoMaisProximo(maisProximo.ponto)
        setDistancia(maisProximo.rota.routes[0]?.legs[0].distance?.text || null)
        setDuracao(maisProximo.rota.routes[0]?.legs[0].duration?.text || null)
        setDirections(maisProximo.rota)
      }
    }
    if (userLocation && isLoaded) calcularDistancia()
  }, [userLocation, isLoaded])

  return isLoaded && userLocation && pontoMaisProximo ? (
    <div className="mt-10 w-full">
      {distancia && duracao && (
        <div className="flex items-center justify-center gap-6 text-green-400 mb-4">
          <div className="flex items-center gap-2">
            <CarFront className="w-5 h-5" />
            <span className="text-sm">{distancia}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <span className="text-sm">{duracao}</span>
          </div>
        </div>
      )}

      <div className="aspect-[16/9] rounded-xl overflow-hidden border border-green-600 shadow-lg">
        <GoogleMap
          center={userLocation}
          zoom={13}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            gestureHandling: 'greedy',
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          }}
          onLoad={(map) => (mapRef.current = map)}
        >
          <Marker position={userLocation} label="Você" />
          {pontos.map((p, i) => (
            <Marker key={i} position={{ lat: p.lat, lng: p.lng }} label={p.nome} />
          ))}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  ) : null
}
