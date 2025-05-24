'use client'

import { FeatureCard } from './FeatureCard'
import { Leaf, MapPin, Sparkles } from 'lucide-react'

export function FeatureSection() {
  return (
    <section className="mx-auto mt-12 max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <FeatureCard
          icon={<Leaf className="text-green-400" />}
          redirect='/tutoriais'
          title="Aprenda sobre Reciclagem"
          description="Não sabe por onde começar? Veja nossos tutoriais e aprenda a reciclar com consciência."
          borderColor="border-green-800"
          buttonLabel="Ver tutoriais"
        />
        <FeatureCard
          icon={<MapPin className="text-green-400" />}
          redirect='coletaform'
          title="Pontos de Coleta"
          description="Encontre um ponto de coleta sempre perto de você e contribua para um mundo melhor."
          borderColor="border-green-800"
          buttonLabel="Buscar pontos"
        />
        <FeatureCard
          icon={<Sparkles className="text-green-400" />}
          redirect=''
          title="Faça Parte"
          description="Junte-se à comunidade Cooperzagati e ajude a transformar o mundo com pequenas ações."
          borderColor="border-green-800"
          buttonLabel="Quero participar"
        />
      </div>
    </section>
  )
}
