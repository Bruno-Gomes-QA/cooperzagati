'use client'

import { useRegistrarUsuario } from '@/hooks/useRegistrarUsuario'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const { user,loading } = useRegistrarUsuario()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/completarcadastro')
    }
  }, [loading, user])

  return <p className="text-white p-10">Redirecionando...</p>
}
