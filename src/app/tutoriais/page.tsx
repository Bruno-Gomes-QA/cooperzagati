'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle, Leaf, Trash2, FlaskConical, ShoppingBag, SprayCan,
  Box, Newspaper, Utensils, BatteryCharging, Monitor, Palette, Cpu
} from "lucide-react"

const materiais = [
  {
    tipo: "PEAD (Polietileno de Alta Densidade)",
    exemplo: "Frascos de produtos de limpeza (ex: desinfetante)",
    icone: <SprayCan className="h-6 w-6 text-green-600" />,
  },
  {
    tipo: "PEBD (Polietileno de Baixa Densidade)",
    exemplo: "Sacolinha de supermercado",
    icone: <ShoppingBag className="h-6 w-6 text-yellow-500" />,
  },
  {
    tipo: "PET (Polietileno Tereftalato)",
    exemplo: "Garrafas de refrigerante ou água",
    icone: <FlaskConical className="h-6 w-6 text-blue-500" />,
  },
  {
    tipo: "Alumínio",
    exemplo: "Latas de refrigerante ou cerveja",
    icone: <Box className="h-6 w-6 text-gray-600" />,
  },
  {
    tipo: "Vidro",
    exemplo: "Potes de conserva ou garrafas de vidro",
    icone: <Leaf className="h-6 w-6 text-emerald-700" />,
  },
  {
    tipo: "Papel",
    exemplo: "Jornais, revistas, folhas de caderno",
    icone: <Newspaper className="h-6 w-6 text-sky-600" />,
  },
  {
    tipo: "Papelão",
    exemplo: "Caixas de encomenda, embalagens",
    icone: <Trash2 className="h-6 w-6 text-orange-500" />,
  },
  {
    tipo: "Metal",
    exemplo: "Talheres, panelas velhas (sem cabo plástico)",
    icone: <Utensils className="h-6 w-6 text-zinc-700" />,
  },
  {
    tipo: "Pilhas e Baterias",
    exemplo: "Pilha AA, bateria de celular",
    icone: <BatteryCharging className="h-6 w-6 text-red-600" />,
  },
  {
    tipo: "Eletrônicos",
    exemplo: "Celulares, teclados, TVs antigas",
    icone: <Monitor className="h-6 w-6 text-indigo-600" />,
  },
  {
    tipo: "Tinta ou Resíduos Químicos",
    exemplo: "Restos de tinta, solventes",
    icone: <Palette className="h-6 w-6 text-purple-600" />,
  },
  {
    tipo: "Resíduos de Informática",
    exemplo: "Placas mãe, HDs, cabos",
    icone: <Cpu className="h-6 w-6 text-teal-600" />,
  },
]

export default function TutoriaisPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
        <h1 className="text-3xl font-bold">Parabéns pela sua atitude! ♻️</h1>
        <p className="text-muted-foreground mt-2">
          Aprender a separar o lixo é um grande passo para um mundo melhor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materiais.map((material, idx) => (
          <Card key={idx} className="flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base sm:text-lg break-words leading-snug">
                {material.tipo}
              </CardTitle>
              {material.icone}
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{material.exemplo}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Não sabe onde descartar seus materiais recicláveis?
        </p>
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => window.location.href = '/coletaform'}
        >
          Encontrar Ponto de Coleta Próximo
        </Button>
      </div>
    </main>
  )
}
