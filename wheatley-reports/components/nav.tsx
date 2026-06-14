'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { LayoutDashboard, DollarSign, TrendingUp, Receipt, Settings, RefreshCw, Landmark } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/',         label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/revenue',  label: 'Revenue',    icon: DollarSign },
  { href: '/expenses', label: 'Expenses',   icon: Receipt },
  { href: '/roi',      label: 'ROI',        icon: TrendingUp },
  { href: '/capital',  label: 'Capital',    icon: Landmark },
  { href: '/settings', label: 'Settings',   icon: Settings },
]

export function Nav() {
  const pathname = usePathname()
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState('')

  async function handleSync() {
    setSyncing(true)
    setSyncMsg('')
    try {
      const res = await fetch('/api/sync', { method: 'POST' })
      const data = await res.json()
      setSyncMsg(data.message ?? data.error ?? 'Done')
    } catch {
      setSyncMsg('Sync failed')
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncMsg(''), 4000)
    }
  }

  return (
    <nav className="fixed left-0 top-0 h-full w-56 bg-slate-900 text-white flex flex-col z-50">
      <div className="px-6 py-5 border-b border-slate-700">
        <div className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Wheatley Reports</div>
        <div className="text-sm font-medium text-slate-200">82801 Wheatley Ct</div>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon
          const active = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-6 py-2.5 text-sm transition-colors',
                active
                  ? 'bg-slate-700 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="px-4 pb-6 border-t border-slate-700 pt-4">
        <button
          onClick={handleSync}
          disabled={syncing}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 transition-colors text-slate-200"
        >
          <RefreshCw className={clsx('w-3 h-3', syncing && 'animate-spin')} />
          {syncing ? 'Syncing…' : 'Sync Now'}
        </button>
        {syncMsg && (
          <p className="mt-2 text-xs text-slate-400 text-center leading-tight">{syncMsg}</p>
        )}
      </div>
    </nav>
  )
}
