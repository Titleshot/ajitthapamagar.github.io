import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { BackButton } from './BackButton'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-mig-bg">
      <Navbar />
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <BackButton />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
