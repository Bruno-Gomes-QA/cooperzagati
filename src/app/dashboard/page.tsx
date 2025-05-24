'use client'

import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { FeatureCard } from '@/components/Home/FeatureCard'
import { CalendarCheck, MapPin, BookOpenText } from 'lucide-react'

export default function Dashboard() {
  const { usuario, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/home')
  }

  if (loading) return <p className="text-white p-6">Carregando...</p>
  if (!usuario) return <p className="text-white p-6">Acesso negado</p>

  return (
    <main className="min-h-screen px-4 py-12 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Olá, {usuario.nome}!</h1>
          <p className="text-white/80 mt-2">Bem-vindo ao seu painel pessoal 🌱</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-full border-green-500 text-green-300 hover:bg-green-600/10"
            asChild
          >
            <Link href="/home">Voltar para Home</Link>
          </Button>
          <Button
            variant="destructive"
            className="rounded-full"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <FeatureCard
          icon={<CalendarCheck className="text-green-400" />}
          redirect="/coletaform"
          title="Agendar Coleta"
          description="Você faz parte de uma empresa ou condomínio? Agende uma visita e nós vamos até você!"
          buttonLabel="Agendar"
        />
        <FeatureCard
          icon={<MapPin className="text-green-400" />}
          redirect="/coletaform"
          title="Pontos de Coleta"
          description="Encontre os pontos de coleta mais próximos da sua residência."
          buttonLabel="Buscar"
        />
        <FeatureCard
          icon={<BookOpenText className="text-green-400" />}
          redirect="/tutoriais"
          title="Tutoriais"
          description="Veja materiais educativos para melhorar sua consciência ambiental."
          buttonLabel="Aprender"
        />
      </section>
    </main>
  )
}
