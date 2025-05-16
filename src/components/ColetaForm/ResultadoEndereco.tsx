import { MapPin } from 'lucide-react'

export function ResultadoEndereco({
  endereco,
}: {
  endereco: {
    logradouro: string
    bairro: string
    localidade: string
    uf: string
  }
}) {
  return (
    <div className="mt-6 flex items-start gap-2 text-green-400 px-4">
      <MapPin className="w-5 h-5 mt-1" />
      <p className="text-sm leading-relaxed">
        {endereco.logradouro}, {endereco.bairro} – {endereco.localidade}/{endereco.uf}
      </p>
    </div>
  )
}
