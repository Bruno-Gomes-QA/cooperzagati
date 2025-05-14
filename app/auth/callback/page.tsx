'use client'

import { useRegistrarUsuario } from '@/hooks/useRegistrarUsuario'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const { user, loading } = useRegistrarUsuario()
  const router = useRouter()

  useEffect(() => {
    const verificarCadastro = async () => {
      if (!loading && user) {
        const { data } = await supabase
          .from('user_registration_status')
          .select('full_registration')
          .eq('auth_id', user.id)
          .maybeSingle()

        if (data?.full_registration) {
          router.push('/dashboard')
        } else {
          router.push('/completarcadastro')
        }
      }
    }

    verificarCadastro()
  }, [loading, user, router])

  return <p className="text-white p-10">Redirecionando...</p>
}
