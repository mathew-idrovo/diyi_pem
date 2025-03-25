'use server'
import transporter from '@/lib/nodemailer'
import QRCode from 'qrcode'

export const sendCardEmail = async (
  email: string,
  cedula: string,
  securityCode: string
) => {
  try {
    // Crear la URL para el código QR
    const cardUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'http:// 192.168.0.10:3000'
    }/${cedula}?securitycode=${securityCode}`

    // Generar código QR como data URL
    const qrCodeDataUrl = await QRCode.toDataURL(cardUrl)

    // Enviar correo con código QR
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'mateoicecua2000@gmail.com',
      to: email,
      subject: 'Tu Tarjeta Médica Digital',
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4a5568;">Tu Tarjeta Médica Digital</h2>
              <p>Hola,</p>
              <p>Tu cuenta ha sido activada correctamente. Aquí está tu tarjeta médica digital:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <img src="${qrCodeDataUrl}" alt="QR Code" style="max-width: 250px;" />
              </div>
              
              <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold;">Tu código de seguridad:</p>
                <p style="font-size: 24px; letter-spacing: 2px; margin: 10px 0;">${securityCode}</p>
                <p style="margin: 0; font-size: 12px; color: #718096;">Guarda este código. Lo necesitarás para acceder a tu información médica.</p>
              </div>
              
              <p>Para acceder a tu información médica, escanea el código QR o visita:</p>
              <p style="word-break: break-all; background-color: #f1f5f9; padding: 10px; border-radius: 4px;">${cardUrl}</p>
              
              <p>Puedes mostrar este QR a profesionales médicos en caso de emergencia.</p>
              <p>Saludos,<br/>El equipo de Tarjeta Médica</p>
            </div>
          `,
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending card email:', error)
    return { error: 'Error al enviar el correo con la tarjeta' }
  }
}
