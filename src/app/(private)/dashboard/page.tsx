import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function NamePage() {
  let users = []
  users = await prisma.user.findMany({ orderBy: { name: 'asc' } })
  console.log(users)
  return (
    <div className="bg-gray-100">
      <div className=" flex flex-col items-center justify-center">
        <ul className="bg-white shadow-md rounded-lg p-5">
          {users.map((u) => (
            <li key={u.id} className="border-b last:border-none p-2">
              {u.name} ({u.email}) - {u.role}
            </li>
          ))}
        </ul>
        <Link
          href="/dashboard/add-user"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Usuario
        </Link>
      </div>
    </div>
  )
}
