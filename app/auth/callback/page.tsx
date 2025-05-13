'use client'

import { useRegistrarUsuario } from '@/hooks/useRegistrarUsuario'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const { loading } = useRegistrarUsuario()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      router.push('/completarcadastro')
    }
  }, [loading])

  return <p className="text-white p-10">Redirecionando...</p>
}
