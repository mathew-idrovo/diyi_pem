'use server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const activateUser = async (
  token: string,
  name: string,
  password: string,
  disease: string,
  medication: string,
  phone: string, // Add appropriate phone value
  cedula: string
) => {
  if (!token || !name || !password || !disease || !medication) {
    return { error: 'Datos incompletos' }
  }

  // 1️⃣ Verificar si el token es válido
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken || verificationToken.expires < new Date()) {
    return { error: 'Token inválido o expirado' }
  }

  // 2️⃣ Hashear la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3️⃣ Crear el usuario en la base de datos
  const newUser = await prisma.user.create({
    data: {
      email: verificationToken.email,
      name,
      password: hashedPassword,
      isActive: true,
      phone, // Add appropriate phone value
      cedula, // Add appropriate cedula value
    },
  })

  // 4️⃣ Crear la tarjeta con el JSON de enfermedades y medicamentos
  const newCard = await prisma.card.create({
    data: {
      userId: newUser.id,
      data: {
        diseases: [disease], // Lista con una enfermedad (se puede expandir)
        medications: [medication], // Lista con un medicamento
      },
    },
  })

  // 5️⃣ Generar un código de seguridad
  const securityCode = await prisma.securityCode.create({
    data: {
      cardId: newCard.id,
      code: Math.random().toString(36).slice(-8),
      usedCount: 0,
      lastUsedAt: null,
    },
  })

  // 6️⃣ Eliminar el token, ya que fue utilizado
  await prisma.verificationToken.delete({
    where: { token },
  })

  return {
    success: 'Cuenta activada correctamente',
    securityCode: securityCode.code,
  }
}
