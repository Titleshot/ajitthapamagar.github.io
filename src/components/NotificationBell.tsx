import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchNotifications, markNotificationRead } from '../lib/serverApi'

type NotificationRow = {
  id: string
  title: string
  message: string
  is_read: boolean
  created_at: string
}

export function NotificationBell() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<NotificationRow[]>([])

  useEffect(() => {
    if (!user?.id) return
    void fetchNotifications(user.id)
      .then((res) => setRows(res as NotificationRow[]))
      .catch(() => setRows([]))
  }, [user?.id])

  const unread = rows.filter((r) => !r.is_read).length

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-xl border border-white/10 p-2 text-mig-muted hover:text-mig-white"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-mig-gold px-1 text-[10px] font-semibold text-mig-bg">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-white/10 bg-mig-bg/95 p-3 shadow-xl">
          <p className="px-2 pb-2 text-xs uppercase tracking-wide text-mig-muted">Notifications</p>
          <div className="max-h-72 space-y-2 overflow-auto">
            {rows.length === 0 && <p className="px-2 py-3 text-xs text-mig-muted">No notifications yet.</p>}
            {rows.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  void markNotificationRead(r.id)
                  setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, is_read: true } : x)))
                }}
                className={`w-full rounded-xl border px-3 py-2 text-left ${
                  r.is_read ? 'border-white/5 bg-white/[0.02]' : 'border-mig-gold/30 bg-mig-gold/5'
                }`}
              >
                <p className="text-sm font-medium text-mig-white">{r.title}</p>
                <p className="mt-1 text-xs text-mig-muted">{r.message}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
