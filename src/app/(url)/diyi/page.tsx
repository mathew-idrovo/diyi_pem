import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { ActivationForm } from '@/components'

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
      <ActivationForm token={token} />
    </div>
  )
}
