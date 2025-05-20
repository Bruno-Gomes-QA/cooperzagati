'use client'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { Home, MapPin, Route, LogOut, Truck } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import clsx from 'clsx'

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (route: string) => pathname.startsWith(route)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="justify-center">
        <Image
          src="/core/cooperzagati_logo_header.png"
          alt="Cooperzagati"
          width={160}
          height={40}
          className="object-contain"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={clsx(
                isActive('/dashboard/func') && !isActive('/dashboard/func/pontos') && !isActive('/dashboard/func/rotas') && 'text-green-500 font-semibold'
              )}
            >
              <Link href="/dashboard/func">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={clsx(
                isActive('/dashboard/func/pontos') && 'text-green-500 font-semibold'
              )}
            >
              <Link href="/dashboard/func/pontos">
                <MapPin className="mr-2 h-4 w-4" />
                Pontos de Coleta
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={clsx(
                isActive('/dashboard/func/rotas') && 'text-green-500 font-semibold'
              )}
            >
              <Link href="/dashboard/func/rotas">
                <Route className="mr-2 h-4 w-4" />
                Rotas
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className={clsx(
              isActive('/dashboard/func/caminhoes') && 'text-green-500 font-semibold'
            )}
          >
            <Link href="/dashboard/func/caminhoes">
              <Truck className="mr-2 h-4 w-4" />
              Caminhões
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-red-500 hover:bg-red-900/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
