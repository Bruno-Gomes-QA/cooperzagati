'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Header } from "@/components/Home/Header";
import { Carousel } from "@/components/Home/Carousel";
import { FeatureSection } from "@/components/Home/FeatureSection";
import { Footer } from "@/components/Home/Footer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const { usuario, loading } = useAuth()
  const router = useRouter()
  const [verificado, setVerificado] = useState(false)

  useEffect(() => {
    const verificarCadastro = async () => {
      if (!loading && usuario) {
        const { data } = await supabase
          .from('user_registration_status')
          .select('full_registration')
          .eq('auth_id', usuario.id)
          .maybeSingle()

        if (!data?.full_registration) {
          router.replace('/dashboard')
        } else {
          setVerificado(true)
        }
      }
    }

    verificarCadastro()
  }, [loading, usuario, router])

  if (!verificado && usuario) return null

  return (
    <div>
      <Header />
      <Carousel />
      <FeatureSection />
      <Footer />
    </div>
  );
}
