'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Usuario {
  id: number
  nome: string
  email: string
  foto_url?: string
  papel: string
  cadastro_completo: boolean
}

interface AuthContextData {
  usuario: Usuario | null
  loading: boolean
}

const AuthContext = createContext<AuthContextData>({
  usuario: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const carregarUsuario = async () => {
      const { data: authData } = await supabase.auth.getUser()
      const user = authData?.user

      if (!user) {
        setUsuario(null)
        setLoading(false)
        return
      }

      const { data: usuarioDB } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', user.email)
        .single()

      if (usuarioDB) setUsuario(usuarioDB)
      setLoading(false)
    }

    carregarUsuario()
    
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setUsuario(null)
      }
      if (event === 'SIGNED_IN') {
        carregarUsuario()
      }
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ usuario, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
