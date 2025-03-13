'use server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const activateUser = async (
  token: string,
  name: string,
  password: string,
  disease: string,
  medication: string
) => {
  if (!token || !name || !password || !disease || !medication) {
    return { error: 'Datos incompletos' }
  }

  // Verificar si el token es válido
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken || verificationToken.expires < new Date()) {
    return { error: 'Token inválido o expirado' }
  }

  // Hashear la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10)

  // Activar el usuario
  const updatedUser = await prisma.user.update({
    where: { email: verificationToken.email },
    data: {
      isActive: true,
      name,
      password: hashedPassword,
    },
  })

  // Buscar la tarjeta del usuario o crear una nueva
  let card = await prisma.card.findFirst({
    where: { userId: updatedUser.id },
  })

  if (!card) {
    card = await prisma.card.create({
      data: {
        userId: updatedUser.id,
        data: {},
      },
    })
  }

  // Guardar enfermedades y medicamentos en `data` (JSON)
  const updatedCard = await prisma.card.update({
    where: { id: card.id },
    data: {
      data: {
        diseases: disease,
        medications: medication,
      },
    },
  })

  // Generar un código de seguridad
  const securityCode = await prisma.securityCode.create({
    data: {
      cardId: card.id,
      code: Math.random().toString(36).slice(-8),
      usedCount: 0,
      lastUsedAt: null,
    },
  })

  // Eliminar el token ya que fue utilizado
  await prisma.verificationToken.delete({
    where: { token },
  })

  return {
    success: 'Cuenta activada correctamente',
    securityCode: securityCode.code,
  }
}
