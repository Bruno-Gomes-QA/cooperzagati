'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Footer } from '@/components/Home/Footer'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut, Pencil } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FeatureCard } from '@/components/Home/FeatureCard'
import { BookOpen, Settings } from 'lucide-react'


export default function EmpresaDashboard() {
  const { usuario } = useAuth()
  const [dados, setDados] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const carregar = async () => {
      if (usuario) {
        const { data } = await supabase
          .from('organization_users')
          .select('*')
          .eq('auth_id', usuario.id)
          .maybeSingle()

        if (data) setDados(data)
      }
    }

    carregar()
  }, [usuario])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!usuario || !dados) return <p className="text-white p-6">Carregando...</p>

return (
  <main className="min-h-screen bg-background text-foreground py-12 px-4">
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="w-full max-w-3xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-green-500">Olá, {dados.contact_person}!</h1>
          <p className="text-muted-foreground mt-1">Gerencie os dados da sua empresa abaixo.</p>
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <Pencil className="w-4 h-4" /> Editar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Editar informações</DialogTitle>
              <p className="text-white">Ainda estamos implementando essa funcionalidade...</p>
            </DialogContent>
          </Dialog>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="rounded-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sair
          </Button>
        </div>
      </header>

      <Tabs defaultValue="empresa" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted text-white">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="contato">Contato</TabsTrigger>
          <TabsTrigger value="coleta">Coleta</TabsTrigger>
          <TabsTrigger value="localizacao">Localização</TabsTrigger>
        </TabsList>

        {[
          { value: 'empresa', title: 'Empresa', desc: 'Informações institucionais.', campos: [
              { label: 'Nome da empresa', valor: dados.organization_name },
              { label: 'Responsável', valor: dados.contact_person },
              { label: 'Parceria', valor: dados.interested_in_partnership ? 'Sim' : 'Não' },
          ]},
          { value: 'contato', title: 'Contato', desc: 'Informações de contato.', campos: [
              { label: 'Telefone', valor: dados.phone },
              { label: 'Email', valor: dados.email },
          ]},
          { value: 'coleta', title: 'Coleta', desc: 'Sobre coleta e reciclagem.', campos: [
              { label: 'Volume semanal', valor: dados.weekly_waste_amount },
              { label: 'Infraestrutura', valor: dados.collection_infrastructure },
              { label: 'Dias preferenciais', valor: dados.preferred_days },
          ]},
          { value: 'localizacao', title: 'Localização', desc: 'Endereço da empresa.', campos: [
              { label: 'Endereço', valor: dados.address },
              { label: 'Tipo de local', valor: dados.location_type },
          ]},
        ].map(({ value, title, desc, campos }) => (
          <TabsContent key={value} value={value} className="mt-6">
            <Card className="rounded-xl border border-green-600 bg-card text-card-foreground shadow">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {campos.map((campo, i) => (
                  <Campo key={i} label={campo.label} valor={campo.valor} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      <FeatureCard
        icon={<BookOpen className="w-10 h-10 text-green-500" />}
        redirect="/tutoriais"
        title="Tutoriais"
        description="Aprenda sobre todos os tipos de materiais, e como reciclar."
        buttonLabel="Ver tutoriais"
      />
      <FeatureCard
        icon={<Settings className="w-10 h-10 text-green-500" />}
        redirect="/servicos"
        title="Serviços"
        description="Conheça todos os serviços que oferecemos."
        buttonLabel="Ver serviços"
      />
    </div>
    </div>
    <Footer/>
  </main>
)

}

function Campo({ label, valor }: { label: string, valor: string }) {
  return (
    <div className="space-y-1">
      <Label className="text-white">{label}</Label>
      <Input value={valor} disabled className="bg-[#1a1a1a] text-white border border-green-600 rounded-md" />
    </div>
  )
}
