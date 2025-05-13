'use client'

import { useAuth } from '@/context/AuthContext'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { LayoutDashboard } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function GoogleLoginButton() {
  const { usuario, loading } = useAuth()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.SUPABASE_REDIRECT_URL,
      },
    })
  } 

  if (loading) return null

  if (usuario) {
    return (
      <Link href="/dashboard">
        <Button
          variant="outline"
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-black px-5 py-2 hover:bg-white/10 transition-colors"
        >
          <LayoutDashboard className="w-5 h-5 text-white" />
          <span className="text-sm font-medium text-white">Dashboard</span>
        </Button>
      </Link>
    )
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogin}
      className="group flex items-center gap-2 rounded-full border border-white/20 bg-black px-5 py-2 hover:bg-white/10 transition-colors"
    >
      <Image
        src="/core/google-logo.png"
        alt="Google logo"
        width={18}
        height={18}
      />
      <span className="text-sm font-medium text-white">Entrar</span>
    </Button>
  )
}
