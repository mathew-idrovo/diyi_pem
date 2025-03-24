'use client'

import { LayoutDashboard } from 'lucide-react'
import React, { useState } from 'react'
const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '#dashboard',
    active: true,
  },
  {
    title: 'Cards',
    icon: LayoutDashboard,
    href: '#dashboard',
    active: true,
  },
]
export const SideBar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>('Usuarios')

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <aside className="w-64 bg-gray-800 border-r h-screen border-gray-700 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.active

            return (
              <div key={item.title}>
                <a
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span>{item.title}</span>
                </a>
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
