'use server'

import transporter from '@/lib/nodemailer'
import prisma from '@/lib/prisma'
import crypto from 'crypto'

export const generateVerificationToken = async (email: string) => {
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date()
  expires.setMinutes(expires.getMinutes() + 30)

  // 📝 Guardar el nuevo token en la base de datos
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  })

  // 🔗 Crear el enlace de verificación
  const verifyLink = `http://localhost:3000/diyi?token=${token}`

  // 📧 Enviar el correo de verificación
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verifica tu cuenta',
    html: `
        <p>Hola,</p>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verifyLink}">Verificar cuenta</a>
        <p>Este enlace expira en 30 minutos.</p>
      `,
  })

  return { message: 'Correo de verificación enviado' }
}
