import { EmailTemplate } from '@/components'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json() // 📌 Recibir email y nombre del usuario

    if (!email) {
      return Response.json({ error: 'Email requerido' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // 📌 Cambia por un dominio verificado en Resend
      to: ['mateoicecua2000@gmail.com'], // 📌 Ahora usa el email dinámico
      subject: 'Activa tu cuenta en TuEmpresa',
      react: EmailTemplate({ firstName: name }) as React.ReactElement, // 📌 Usa el template con datos dinámicos
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json({ message: 'Correo enviado', data })
  } catch (error) {
    console.error('Error al enviar el correo:', error)
    return Response.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
