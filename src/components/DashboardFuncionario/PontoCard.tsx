import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  ponto: {
    name: string
    neighborhood: string
    city: string
    location_type: string
  }
}

export function PontoCard({ ponto }: Props) {
  return (
    <Card className="bg-[#0a0a0a] text-white border border-green-700 hover:shadow-xl transition">
      <CardHeader>
        <CardTitle className="text-lg text-green-500">{ponto.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <p><strong>Bairro:</strong> {ponto.neighborhood}</p>
        <p><strong>Cidade:</strong> {ponto.city}</p>
        <p><strong>Tipo:</strong> {ponto.location_type}</p>
      </CardContent>
    </Card>
  )
}
