'use server'

import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs'
import { use } from 'react'

export const registerClients = async (
  name: string,
  email: string,
  phone: string,
  cedula: string
) => {
  try {
    // 📌 Verificar si el email ya existe
    const existingClient = await prisma.cliente.findUnique({
      where: { email },
    })

    if (existingClient) {
      return { ok: false, message: 'El email ya está registrado.' }
    }

    // 📌 Crear nuevo cliente
    const client = await prisma.cliente.create({
      data: { name, email: email.toLowerCase(), phone, cedula },
    })

    return { ok: true, message: 'Cliente creado exitosamente.', client }
  } catch (error) {
    console.error('❌ Error al registrar cliente:', error)
    return {
      ok: false,
      message: 'Error en el servidor al registrar el cliente.',
    }
  }
}
