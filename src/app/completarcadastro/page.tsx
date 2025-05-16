'use client'

import { useState } from 'react'
import { PessoaForm } from '@/components/completeRegister/PessoaForm'

export default function CompletarCadastroPage() {
  const [tipo, setTipo] = useState<'pf' | 'pj'>('pf')

  return (
    <main className="min-h-screen px-4 py-12 bg-[#0a0a0a] text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-500 mb-4">Complete seu Cadastro</h1>

      <div className="flex flex-col items-center gap-4 mb-6">
        <p className="text-white/80">Você está cadastrando como:</p>
        <div className="flex gap-4">
          <button
            onClick={() => setTipo('pf')}
            className={`px-6 py-2 rounded-full transition ${
              tipo === 'pf'
                ? 'bg-green-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Pessoa Física
          </button>
          <button
            onClick={() => setTipo('pj')}
            className={`px-6 py-2 rounded-full transition ${
              tipo === 'pj'
                ? 'bg-green-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Pessoa Jurídica
          </button>
        </div>
      </div>

      {tipo && <PessoaForm tipo={tipo} />}
    </main>
  )
}
