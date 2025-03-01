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
    const user = await prisma.cliente.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        phone: phone,
        cedula: cedula,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cedula: true,
      },
    })

    return {
      ok: true,
      user: user,
      message: 'Cliente creado',
    }
  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: 'No se pudo crear el cliente',
    }
  }
}
