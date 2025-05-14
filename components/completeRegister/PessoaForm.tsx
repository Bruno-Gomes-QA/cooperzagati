'use client'

import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { EnderecoInput } from './EnderecoInput'
import { FormularioPF } from './FormularioPF'
import { FormularioPJ } from './FormularioPJ'

interface Props {
  tipo: 'pf' | 'pj'
}

export function PessoaForm({ tipo }: Props) {
  const [formData, setFormData] = useState<any>({})
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState<{
    logradouro: string
    bairro: string
    localidade: string
    uf: string
  } | null>(null)
  const [emCasa, setEmCasa] = useState<null | boolean>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const enderecoCompleto = endereco
      ? `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}/${endereco.uf}`
      : ''

    const { usuario, loading } = useAuth()

    const user = usuario
    if (!user) return alert('Usuário não autenticado')

    const updates = {
      cadastro_completo: true,
      nome: formData.nome_completo || formData.responsavel
    }
    console.log(user)
    let cadastroData: any = {
    }
      if (tipo === 'pf') {
        cadastroData = {
          usuario_id: user.id,
          cpf: formData.cpf,
          moradores: formData.moradores,
          material: formData.material,
          telefone: formData.telefone,
          receber_dicas: formData.receber_dicas ?? false,
          endereco: enderecoCompleto,
        }
      } else {
      cadastroData = {
        ...cadastroData,
        cnpj: formData.cnpj,
        responsavel: formData.responsavel,
        nome_empresa: formData.nome_empresa,
        email: formData.email,
        tipo_local: formData.tipo_local,
        quantidade_semanal: formData.quantidade_semanal,
        infraestrutura: formData.infraestrutura,
        dias_preferencia: formData.dias_preferencia,
        telefone: formData.telefone,
        quer_parceria: formData.quer_parceria ?? false,
      }
    }

    const table = tipo === 'pf' ? 'cadastro_pf' : 'cadastro_pj'
    const { error } = await supabase.from(table).insert(cadastroData)

    if (!error) {
      await supabase
        .from('usuarios')
        .update(updates)
        .eq('email', user.email)
      router.push('/dashboard')
    } else {
      alert('Erro ao salvar dados!')
    }
  }

  return (
    <section className="w-full max-w-4xl mx-auto mt-10 bg-[#0a0a0a] border border-green-600 rounded-3xl shadow-2xl p-8 sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <h2 className="text-2xl font-bold text-green-500 mb-6">
          {tipo === 'pf' ? 'Cadastro - Pessoa Física' : 'Cadastro - Pessoa Jurídica'}
        </h2>

        {tipo === 'pf' ? (
          <FormularioPF formData={formData} setFormData={setFormData} handleChange={handleChange} />
        ) : (
          <FormularioPJ formData={formData} setFormData={setFormData} handleChange={handleChange} />
        )}

        <EnderecoInput
          emCasa={emCasa}
          setEmCasa={setEmCasa}
          cep={cep}
          setCep={setCep}
          endereco={endereco}
          setEndereco={setEndereco}
        />

        <div className="pt-4">
          <button type="submit" className="rounded-full bg-green-600 hover:bg-green-700 px-6 py-2">
            Finalizar Cadastro
          </button>
        </div>
      </form>
    </section>
  )
}
