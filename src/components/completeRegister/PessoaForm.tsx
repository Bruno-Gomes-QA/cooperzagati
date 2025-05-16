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
    const initialPF = {
    nome_completo: '',
    cpf: '',
    telefone: '',
    moradores: '',
    material: '',
    receber_dicas: false,
  }

  const initialPJ = {
    nome_empresa: '',
    cnpj: '',
    responsavel: '',
    email: '',
    tipo_local: '',
    quantidade_semanal: '',
    infraestrutura: '',
    dias_preferencia: '',
    telefone: '',
    quer_parceria: false,
  }

  const [formData, setFormData] = useState<any>(tipo === 'pf' ? initialPF : initialPJ)
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState<{
    logradouro: string
    bairro: string
    localidade: string
    uf: string
  } | null>(null)
  const [emCasa, setEmCasa] = useState<null | boolean>(null)
  const router = useRouter()

  const { usuario } = useAuth()
  if (!usuario) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!endereco) {
      alert('Por favor, preencha o endereço antes de finalizar o cadastro.')
      return
    }
    const enderecoCompleto = endereco
      ? `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}/${endereco.uf}`
      : ''

    const authId = usuario.id
    let cadastroData: any = {}

    console.log('Dados do formulário:', usuario)
    if (tipo === 'pf') {
      cadastroData = {
        auth_id: authId,
        full_name: formData.nome_completo,
        cpf: formData.cpf,
        phone: formData.telefone,
        household_size: formData.moradores,
        main_recycled_material: formData.material,
        wants_tips: formData.receber_dicas ?? false,
        address: enderecoCompleto,
        full_registration: true,
      }
    } else {
      cadastroData = {
        auth_id: authId,
        organization_name: formData.nome_empresa,
        cnpj: formData.cnpj,
        contact_person: formData.responsavel,
        email: formData.email,
        location_type: formData.tipo_local,
        weekly_waste_amount: formData.quantidade_semanal,
        collection_infrastructure: formData.infraestrutura,
        preferred_days: formData.dias_preferencia,
        phone: formData.telefone,
        interested_in_partnership: formData.quer_parceria ?? false,
        address: enderecoCompleto,
        full_registration: true,
      }
    }

    const table = tipo === 'pf' ? 'individual_users' : 'organization_users'
    const { error } = await supabase.from(table).insert(cadastroData)

    if (error) {
      console.error(error)
      alert('Erro ao salvar dados!')
    } else {
      router.push('/dashboard')
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
