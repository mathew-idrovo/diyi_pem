import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export default async function DiyiPage({
  searchParams: searchParamsPromise, // 🔥 Convertimos `searchParams` en una promesa
}: {
  searchParams?: Promise<{ token?: string }>
}) {
  const searchParams = await searchParamsPromise // ✅ Hacemos `await`
  const token = searchParams?.token

  console.log('Token tomado de la URL:', token)

  if (!token) {
    return redirect('/auth/login') // 🔥 Si no hay token, redirigir al login
  }

  // 🔥 Buscar el token en la base de datos
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
  })

  console.log('token base', verificationToken)

  if (!verificationToken || verificationToken.expires < new Date()) {
    return redirect('/auth/expired') // 🔥 Token inválido o expirado
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold">Bienvenido, activa tu cuenta</h1>

      <form className="bg-white p-6 shadow-md rounded-lg mt-5">
        <input type="hidden" name="token" value={token} />

        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 mb-3 w-full"
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          className="border p-2 mb-3 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  )
}
