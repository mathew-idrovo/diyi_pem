import { auth } from '@/auth.config'
import { SideBar } from '@/components'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session?.user.role !== 'ADMIN') {
    redirect('/auth/login')
  }

  return (
    <>
      {' '}
      <div className="flex flex-row">
        <SideBar />
        {children}{' '}
      </div>
    </>
  )
}
