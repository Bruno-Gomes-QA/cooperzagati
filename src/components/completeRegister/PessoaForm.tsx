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

interface Endereco {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

interface FormDataPF {
  nome_completo: string
  cpf: string
  telefone: string
  moradores: string
  material: string
  receber_dicas: boolean
}

interface FormDataPJ {
  nome_empresa: string
  cnpj: string
  responsavel: string
  email: string
  tipo_local: string
  quantidade_semanal: string
  infraestrutura: string
  dias_preferencia: string
  telefone: string
  quer_parceria: boolean
}

export function PessoaForm({ tipo }: Props) {
  const initialPF: FormDataPF = {
    nome_completo: '',
    cpf: '',
    telefone: '',
    moradores: '',
    material: '',
    receber_dicas: false,
  }

  const initialPJ: FormDataPJ = {
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

  const [formDataPF, setFormDataPF] = useState<FormDataPF>(initialPF)
  const [formDataPJ, setFormDataPJ] = useState<FormDataPJ>(initialPJ)
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState<Endereco | null>(null)
  const [emCasa, setEmCasa] = useState<null | boolean>(null)
  const router = useRouter()
  const { usuario } = useAuth()
  if (!usuario) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (tipo === 'pf') {
      setFormDataPF(prev => ({ ...prev, [name]: value }))
    } else {
      setFormDataPJ(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!endereco) {
      alert('Por favor, preencha o endereço antes de finalizar o cadastro.')
      return
    }

    const enderecoCompleto = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}/${endereco.uf}`
    const authId = usuario.id

    const cadastroData =
      tipo === 'pf'
        ? {
            auth_id: authId,
            full_name: formDataPF.nome_completo,
            cpf: formDataPF.cpf,
            phone: formDataPF.telefone,
            household_size: formDataPF.moradores,
            main_recycled_material: formDataPF.material,
            wants_tips: formDataPF.receber_dicas,
            address: enderecoCompleto,
            full_registration: true,
          }
        : {
            auth_id: authId,
            organization_name: formDataPJ.nome_empresa,
            cnpj: formDataPJ.cnpj,
            contact_person: formDataPJ.responsavel,
            email: formDataPJ.email,
            location_type: formDataPJ.tipo_local,
            weekly_waste_amount: formDataPJ.quantidade_semanal,
            collection_infrastructure: formDataPJ.infraestrutura,
            preferred_days: formDataPJ.dias_preferencia,
            phone: formDataPJ.telefone,
            interested_in_partnership: formDataPJ.quer_parceria,
            address: enderecoCompleto,
            full_registration: true,
          }

    const table = tipo === 'pf' ? 'individual_users' : 'organization_users'
    const { error } = await supabase.from(table).insert(cadastroData)

    if (error) {
      console.error(error)
      alert('Erro ao salvar dados!')
    } else {
      router.push(tipo === 'pf' ? '/dashboard' : '/dashboard-pj')
    }
  }

  return (
    <section className="w-full max-w-4xl mx-auto mt-10 bg-[#0a0a0a] border border-green-600 rounded-3xl shadow-2xl p-8 sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <h2 className="text-2xl font-bold text-green-500 mb-6">
          {tipo === 'pf' ? 'Cadastro - Pessoa Física' : 'Cadastro - Pessoa Jurídica'}
        </h2>

        {tipo === 'pf' ? (
          <FormularioPF
            formData={formDataPF}
            setFormData={setFormDataPF}
            handleChange={handleChange}
          />
        ) : (
          <FormularioPJ
            formData={formDataPJ}
            setFormData={setFormDataPJ}
            handleChange={handleChange}
          />
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
          <button
            type="submit"
            className="rounded-full bg-green-600 hover:bg-green-700 px-6 py-2"
          >
            Finalizar Cadastro
          </button>
        </div>
      </form>
    </section>
  )
}
