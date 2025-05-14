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
        router.replace('/')
        return
      }

      setUser(user)

      const { data: existente, error } = await supabase
        .from('usuarios')
        .select('id, cadastro_completo')
        .eq('email', user.email)
        .single()

      if (!existente) {
        const { error: insertError } = await supabase.from('usuarios').insert({
          nome: user.user_metadata.name,
          email: user.email,
          foto_url: user.user_metadata.avatar_url,
          papel: 'usuario',
          cadastro_completo: false,
        })

        if (insertError) {
          console.error('Erro ao criar usuário:', insertError)
          setLoading(false)
          return
        }

        router.replace('/completarcadastro')
        return
      }

      if (!existente.cadastro_completo) {
        router.replace('/completarcadastro')
        return
      }

      router.replace('/dashboard')
    }

    registrar()
  }, [])

  return { user, loading }
}
