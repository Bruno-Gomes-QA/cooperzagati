'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useRegistrarUsuario() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const verificarCadastro = async () => {
      const { data: sessionData } = await supabase.auth.getUser()
      const user = sessionData?.user

      if (user) {
        setUser(user)
      }

      setLoading(false)
    }

    verificarCadastro()
  }, [])

  return { user, loading }
}
