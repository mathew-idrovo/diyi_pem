import { auth } from '@/auth.config'
import { FormUser } from '@/components'

export default async function NamePage() {
  const session = await auth()

  if (session?.user?.role === 'admin') {
    return <p>You are an admin, welcome!</p>
  }
  return (
    <div className="bg-gray-100">
      <div className=" flex flex-col items-center justify-center">
        <FormUser />
      </div>
    </div>
  )
}
