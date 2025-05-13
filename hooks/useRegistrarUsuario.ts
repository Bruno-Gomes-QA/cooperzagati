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
    const registrar = async () => {
      const { data: sessionData } = await supabase.auth.getUser()
      const user = sessionData?.user

      if (!user) {
        router.push('/')
        return
      }

      setUser(user)

      const { data: existente } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', user.email)
        .single()

      if (!existente) {
        const { error } = await supabase.from('usuarios').insert({
          nome: user.user_metadata.name,
          email: user.email,
          foto_url: user.user_metadata.avatar_url,
          papel: 'usuario',
        })

        if (error) {
          console.error('Erro ao inserir usuário:', error)
        }
      }
      setLoading(false)
    }

    registrar()
  }, [])

  return { user, loading }
}
