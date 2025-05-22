'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Clock3,
  LineChart as ChartIcon,
  Fuel,
  TrendingUp,
  DollarSign,
  Leaf,
} from 'lucide-react'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

const indicadores = [
  {
    title: 'Faturamento Jardim Irapuã',
    value: 'R$ 38.400,00',
    description: '+21% de ganhos simulados',
    icon: <ChartIcon className="w-6 h-6 text-orange-400" />,
  },
  {
    title: 'Eco Pontos Ativos',
    value: '2',
    description: 'Unidades operando atualmente no município',
    icon: <Leaf className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'Eficiência das Rotas',
    value: '+37%',
    description: 'Simulação geral das rotas analisadas',
    icon: <TrendingUp className="w-6 h-6 text-green-400" />,
  },
  {
    title: 'Redução de Combustível',
    value: '-12%',
    description: 'Economia média nos trajetos',
    icon: <Fuel className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'Faturamento Mensal',
    value: '+22%',
    description: 'Aumento estimado com otimização',
    icon: <DollarSign className="w-6 h-6 text-blue-400" />,
  },
  {
    title: 'Tempo de Resposta',
    value: '-40%',
    description: 'Mais agilidade nas coletas',
    icon: <Clock3 className="w-6 h-6 text-purple-400" />,
  },
  {
    title: 'Eficiência Jardim Irapuã',
    value: '+27%',
    description: 'Bairro destaque na simulação',
    icon: <Leaf className="w-6 h-6 text-lime-400" />,
  },
  {
    title: 'Faturamento Torres Taboão',
    value: 'R$ 44.150,00',
    description: '+25% de ganhos simulados',
    icon: <ChartIcon className="w-6 h-6 text-orange-400" />,
  },
]

const bairros = [
  {
    nome: '🌱 Jardim Irapuã',
    eficiencia: '+27%',
    tempo: '-18 min',
    faturamento: 'R$ 38.400,00',
  },
  {
    nome: '🛤 Jardim Triângulo',
    eficiencia: '+22%',
    tempo: '-15 min',
    faturamento: 'R$ 29.700,00',
  },
  {
    nome: '🏰 Torres do Taboão',
    eficiencia: '+30%',
    tempo: '-22 min',
    faturamento: 'R$ 44.150,00',
  },
  {
    nome: '🌳 Cond. Castanheira',
    eficiencia: '+40%',
    tempo: '-17 min',
    faturamento: 'R$ 35.600,00',
  },
]

const comparativo = [
  { categoria: 'Eficiência', Antes: 54, Depois: 91 },
  { categoria: 'Combustível', Antes: 100, Depois: 88 },
  { categoria: 'Faturamento', Antes: 78, Depois: 100 },
  { categoria: 'Atrasos', Antes: 100, Depois: 60 },
]

export default function FuncionarioDashboardPage() {
  return (
    <div className="min-h-screen w-full space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-green-500">Dashboard do Funcionário</h1>
        <p className="mt-2 text-muted-foreground">Resultados simulados com dados fictícios</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {indicadores.map((card, i) => (
          <Card key={i} className="bg-zinc-900 border border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="bg-zinc-900 p-6 rounded-md border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Resultados Simulados: Antes x Depois</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparativo}>
              <XAxis dataKey="categoria" stroke="#888888" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Antes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Depois" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 p-6 rounded-md border border-white/10 overflow-x-auto">
          <h2 className="text-lg font-semibold text-white mb-4">Pontos de Coleta em Destaque</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ponto de Coleta</TableHead>
                <TableHead>Eficiência</TableHead>
                <TableHead>Tempo</TableHead>
                <TableHead>Faturamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bairros.map((b, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{b.nome}</TableCell>
                  <TableCell>{b.eficiencia}</TableCell>
                  <TableCell>{b.tempo}</TableCell>
                  <TableCell>{b.faturamento}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
