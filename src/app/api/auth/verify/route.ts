import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Token not found' }, { status: 400 })
  }
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { identifier_token: { identifier: 'email_verification', token } },
    })
    if (!verificationToken || verificationToken.expires < new Date()) {
      return NextResponse.json({ error: 'Token not found' }, { status: 400 })
    }

    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { isActive: true },
    })
    await prisma.verificationToken.delete({
      where: { identifier_token: { identifier: 'email_verification', token } },
    })
  } catch (error) {
    console.error('Error verifying email:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}
