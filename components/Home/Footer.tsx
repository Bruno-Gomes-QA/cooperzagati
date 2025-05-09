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
          <button className="rounded-full border border-green-500 p-2 hover:bg-green-600/10 transition">
            <Instagram className="h-5 w-5 text-green-400" />
          </button>
          <button className="rounded-full border border-green-500 p-2 hover:bg-green-600/10 transition">
            <MapPin className="h-5 w-5 text-green-400" />
          </button>
          <button className="rounded-full border border-green-500 p-2 hover:bg-green-600/10 transition">
            <MessageCircleMore className="h-5 w-5 text-green-400" />
          </button>
        </div>
      </div>
    </footer>
  )
}
