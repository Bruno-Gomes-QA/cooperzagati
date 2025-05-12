'use client'

import { useEffect, useRef, useState } from 'react'
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader
} from '@react-google-maps/api'
import { CarFront, Timer } from 'lucide-react'

interface Endereco {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

interface MapaRotaColetaProps {
  endereco: Endereco
}

export function MapaRotaColeta({ endereco }: MapaRotaColetaProps) {
  const mapRef = useRef<google.maps.Map | null>(null)
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  )

  const [distancia, setDistancia] = useState<string | null>(null)
  const [duracao, setDuracao] = useState<string | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  })

  useEffect(() => {
    if (isLoaded && endereco) {
      const origin = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}`
      const destination =
        'R. Porfírio Herdeiro, 440 - Parque Industrial das Oliveiras, Taboão da Serra - SP, 06765-480'

      const directionsService = new google.maps.DirectionsService()

      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (result && status === google.maps.DirectionsStatus.OK && directionsRendererRef.current) {
            directionsRendererRef.current.setDirections(result)

            const leg = result.routes[0]?.legs[0]
            if (leg) {
              setDistancia(leg.distance?.text || null)
              setDuracao(leg.duration?.text || null)
            }
          }
        }
      )
    }
  }, [isLoaded, endereco])

  return isLoaded ? (
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
          center={{ lat: -23.6261, lng: -46.7912 }}
          zoom={14}
          options={{
            gestureHandling: 'greedy',
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false
          }}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={(map) => {
            mapRef.current = map
            directionsRendererRef.current = new google.maps.DirectionsRenderer()
            directionsRendererRef.current.setMap(map)
          }}
        />
      </div>
    </div>
  ) : null
}
