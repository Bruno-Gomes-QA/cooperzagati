'use client'

import { Instagram, MessageCircleMore, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-white/10 bg-[#0a0a0a] px-6 py-6 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-white/60 text-center sm:text-left">
          © {new Date().getFullYear()} Cooperzagati — Taboão da Serra - SP
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/cooperzagati/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-500 p-2 hover:bg-green-600/10 transition"
          >
            <Instagram className="h-5 w-5 text-green-400" />
          </a>
          <a
            href="https://www.google.com/maps/place/Cooperzagati+-+Cooperativa+dos+Agentes+Ambientais+de+Tabo%C3%A3o+da+Serra/@-23.6214828,-46.7771148,848m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94ce5465b395ebf7:0xf49a94d8b20c535b!8m2!3d-23.6214828!4d-46.7771148!16s%2Fg%2F11b6hp1zzl?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-500 p-2 hover:bg-green-600/10 transition"
          >
            <MapPin className="h-5 w-5 text-green-400" />
          </a>
          <a
            href="https://wa.me/5511947229703"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-500 p-2 hover:bg-green-600/10 transition"
          >
            <MessageCircleMore className="h-5 w-5 text-green-400" />
          </a>
        </div>
      </div>
    </footer>
  )
}
