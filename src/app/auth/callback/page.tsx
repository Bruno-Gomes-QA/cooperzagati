'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRegistrarUsuario } from '@/hooks/useRegistrarUsuario'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const { user, loading } = useRegistrarUsuario()
  const router = useRouter()

  useEffect(() => {
    const verificarCadastro = async () => {
      if (!user || loading) return

      const email = user.email || ''
      const isFuncionario = email.endsWith('@a.fecaf.com.br')

      if (isFuncionario) {
        await supabase
          .from('user_registration_status')
          .select('auth_id')
          .eq('auth_id', user.id)
          .maybeSingle()

        const { error: insertError } = await supabase
          .from('organization_users')
          .upsert({
            auth_id: user.id,
            organization_name: 'Funcionário Unifecaf',
            contact_person: user.user_metadata.name,
            email: email,
            location_type: 'Institucional',
            weekly_waste_amount: '',
            collection_infrastructure: '',
            preferred_days: '',
            phone: '',
            interested_in_partnership: false,
            address: '',
            full_registration: true,
          }, { onConflict: 'auth_id' })

        if (insertError) {
          console.error('Erro ao cadastrar funcionário:', insertError)
        }

        router.push('/dashboard/func')
        return
      }

      const { data, error } = await supabase
        .from('user_registration_status')
        .select('full_registration, tipo_usuario')
        .eq('auth_id', user.id)
        .maybeSingle()

      if (error) {
        console.error('Erro ao verificar tipo de usuário:', error)
        return
      }

      if (!data?.full_registration) {
        router.push('/completarcadastro')
      } else {
        if (data.tipo_usuario === 'PF') {
          router.push('/dashboard')
        } else if (data.tipo_usuario === 'PJ') {
          router.push('/dashboard/empresa')
        }
      }
    }

    verificarCadastro()
  }, [loading, user, router])

  return <p className="text-white p-10">Redirecionando...</p>
}
