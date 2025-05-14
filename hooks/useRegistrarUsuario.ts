'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export function useRegistrarUsuario() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const verificarCadastro = async () => {
      const { data: sessionData } = await supabase.auth.getUser()
      const user = sessionData?.user

      if (!user) {
        router.replace('/')
        return
      }

      setUser(user)

      const { data: registro } = await supabase
        .from('user_registration_status')
        .select('full_registration')
        .eq('auth_id', user.id)
        .maybeSingle()

      if (!registro?.full_registration) {
        router.replace('/completarcadastro')
      } else {
        router.replace('/dashboard')
      }
    }

    verificarCadastro()
  }, [router])

  return { user, loading }
}
