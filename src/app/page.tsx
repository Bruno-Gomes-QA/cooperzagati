'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FuncionalidadesEIntegrantes } from "@/components/Home/FuncionalidadesEIntegrantes"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Leaf, Fuel, DollarSign, Clock3 } from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts'

const indicadoresResumidos = [
  { title: 'Eficiência Rotas', value: '+37%', icon: <Leaf className="w-5 h-5 text-green-400" /> },
  { title: 'Economia Diesel', value: '-12%', icon: <Fuel className="w-5 h-5 text-yellow-400" /> },
  { title: 'Faturamento', value: '+22%', icon: <DollarSign className="w-5 h-5 text-blue-400" /> },
  { title: 'Tempo Resposta', value: '-40%', icon: <Clock3 className="w-5 h-5 text-purple-400" /> },
]

const comparativo = [
  { categoria: 'Eficiência', Antes: 54, Depois: 91 },
  { categoria: 'Faturamento', Antes: 78, Depois: 100 },
]

const bairros = [
  { nome: '🌱 Jardim Irapuã', eficiencia: '+27%', faturamento: 'R$ 38.400,00' },
  { nome: '🛤 Jardim Triângulo', eficiencia: '+22%', faturamento: 'R$ 29.700,00' },
  { nome: '🏰 Torres do Taboão', eficiencia: '+30%', faturamento: 'R$ 44.150,00' },
  { nome: '🌳 Cond. Castanheira', eficiencia: '+40%', faturamento: 'R$ 35.600,00' },
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen px-4 py-6 space-y-8 bg-background">
    <div className="space-y-2">
      <h1 className="text-xl font-semibold text-green-500">Tecnologia a serviço da coleta seletiva</h1>
      <p className="text-sm text-muted-foreground">
        Desenvolvida em parceria com a <strong>Cooperzagati</strong>, cooperativa de Taboão da Serra, responsável pela coleta da região,
        esta plataforma aplica conceitos de <strong>álgebra linear, otimização matricial e recursão</strong> para transformar a coleta seletiva.
       </p>
      <p className="text-sm text-muted-foreground"> 
        Utilizamos dados simulados e algoritmos inteligentes para calcular as melhores rotas para os caminhões que realizam as coletas, considerando distância,
        tempo e capacidade dos caminhões em tempo real.
      </p>
      <p className="text-sm text-muted-foreground">
        O resultado? Redução significativa de custos, economia de combustível e maior agilidade para os coletores,
        tudo isso apresentado em painéis intuitivos com foco em eficiência operacional e consciência ambiental. 🌱🚛
      </p>
    </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {indicadoresResumidos.map((item, i) => (
          <Card key={i} className="bg-zinc-900 border border-white/10 text-white">
            <CardHeader className="flex items-center justify-between pb-1 space-y-0">
              <CardTitle className="text-sm">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent className="text-green-400 text-lg font-bold">
              {item.value}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-zinc-900 border border-white/10 p-4 text-white">
        <h2 className="text-base font-semibold mb-4">Antes x Depois</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={comparativo}>
            <XAxis dataKey="categoria" stroke="#aaa" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Antes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Depois" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="bg-zinc-900 border border-white/10 p-4 text-white overflow-x-auto">
        <h2 className="text-base font-semibold mb-4">Pontos em Destaque</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ponto</TableHead>
              <TableHead>Eficiência</TableHead>
              <TableHead>Faturamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bairros.map((b, i) => (
              <TableRow key={i}>
                <TableCell>{b.nome}</TableCell>
                <TableCell>{b.eficiencia}</TableCell>
                <TableCell>{b.faturamento}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="flex flex-col gap-4 pt-4">
        <Button
          variant="outline"
          onClick={() =>
            window.open(
              'https://www.google.com/maps/d/u/0/viewer?hl=pt-BR&ll=-23.5860213405655%2C-46.78602729917607&z=12&mid=1nGasIS6v_K2QRN7PAsKsUvYmkT6Vd5k',
              '_blank'
            )
          }
        >
          Visualizar no Mapa
        </Button>
        <Button onClick={() => router.push('/home')}>
          Ir para o Site
        </Button>
      </div>
      <FuncionalidadesEIntegrantes />
    </div>
  )
}
