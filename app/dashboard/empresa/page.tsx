'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { Building, BookOpenText, Handshake } from 'lucide-react'
import { FeatureCard } from '@/components/Home/FeatureCard'

export default function EmpresaDashboard() {
  const { usuario } = useAuth()
  const [dadosEmpresa, setDadosEmpresa] = useState<any>(null)

  useEffect(() => {
    const carregarDados = async () => {
      if (usuario) {
        const { data, error } = await supabase
          .from('organization_users')
          .select('*')
          .eq('auth_id', usuario.id)
          .maybeSingle()

        if (!error) setDadosEmpresa(data)
      }
    }

    carregarDados()
  }, [usuario])

  if (!usuario) return <p className="text-white p-6">Acesso negado</p>
  if (!dadosEmpresa) return <p className="text-white p-6">Carregando dados da empresa...</p>

  return (
    <main className="min-h-screen px-4 py-12 bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4">
          Obrigado pelo cadastro!
        </h1>
        <p className="text-white/80 text-lg mb-10">
          Recebemos suas informações e nossa equipe entrará em contato em breve para agendar a coleta seletiva.
        </p>

<div className="bg-[#121212] border border-green-600 rounded-xl p-6 shadow-lg text-white mt-8">
  <h2 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-2">
    <Building className="w-5 h-5" />
    Informações da Empresa
  </h2>

  <div className="grid md:grid-cols-2 gap-8 text-sm">
    {/* Coluna 1 */}
    <div className="space-y-6">
      {/* Contato */}
      <div>
        <p className="text-green-300 text-base font-semibold flex items-center gap-2 mb-2">
          📞 Contato
        </p>
        <p><strong>Empresa:</strong> {dadosEmpresa.organization_name}</p>
        <p><strong>Responsável:</strong> {dadosEmpresa.contact_person}</p>
        <p><strong>Telefone:</strong> {dadosEmpresa.phone}</p>
        <p><strong>Email:</strong> {dadosEmpresa.email}</p>
      </div>

      {/* Coleta */}
      <div>
        <p className="text-green-300 text-base font-semibold flex items-center gap-2 mb-2">
          🧺 Coleta
        </p>
        <p><strong>Volume semanal:</strong> {dadosEmpresa.weekly_waste_amount}</p>
        <p><strong>Infraestrutura:</strong> {dadosEmpresa.collection_infrastructure}</p>
        <p><strong>Disponibilidade:</strong> {dadosEmpresa.preferred_days}</p>

        {dadosEmpresa.interested_in_partnership && (
          <div className="mt-3">
            <p className="text-green-300 text-base font-semibold flex items-center gap-2 mb-1">
              🤝 Parceria
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-green-700 text-white text-xs font-semibold">
              Interessado em parceria
            </span>
          </div>
        )}
      </div>
    </div>

    {/* Coluna 2 */}
    <div className="space-y-6">
      {/* Localização */}
      <div>
        <p className="text-green-300 text-base font-semibold flex items-center gap-2 mb-2">
          📍 Localização
        </p>
        <p><strong>Endereço:</strong> {dadosEmpresa.address}</p>
        <p><strong>Tipo de Local:</strong> {dadosEmpresa.location_type}</p>
      </div>
    </div>
  </div>
</div>


        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<BookOpenText className="text-green-400" />}
            redirect="/dashboard/tutoriais"
            title="Tutoriais Ambientais"
            description="Acesse nosso conteúdo educativo sobre reciclagem e sustentabilidade."
            buttonLabel="Ver tutoriais"
          />

          <FeatureCard
            icon={<Handshake className="text-green-400" />}
            redirect="/"
            title="Nossos Serviços"
            description="Conheça todas as formas de atuação da Cooperzagati e como ajudamos empresas."
            buttonLabel="Ver serviços"
          />
        </div>
      </div>
    </main>
  )
}
