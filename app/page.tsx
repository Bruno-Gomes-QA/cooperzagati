'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Header } from "@/components/Home/Header";
import { Carousel } from "@/components/Home/Carousel";
import { FeatureSection } from "@/components/Home/FeatureSection";
import { Footer } from "@/components/Home/Footer";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { usuario, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && usuario) {
      if (!usuario.cadastro_completo) {
        router.replace('/completarcadastro')
      }
    }
  }, [loading, usuario])

  return (
    <div>
      <Header/>
      <Carousel/>
      <FeatureSection/>
      <Footer/>
    </div>
  );
}
