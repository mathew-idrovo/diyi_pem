import { MedicalCard } from '@/components'
import prisma from '@/lib/prisma'

interface PageProps {
  params: {
    cedula: string
  }
  searchParams: {
    securitycode?: string
  }
}

export default async function CardPage({ params, searchParams }: PageProps) {
  const { cedula } = params
  const securityCode = searchParams.securitycode

  // Si no hay código de seguridad, redirigir a la página de inicio
  if (!securityCode) {
    return (
      <div className="container mx-auto p-6 max-w-md">
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">
            {' '}
            Código de seguridad no proporcionado.
          </span>
        </div>
      </div>
    )
  }

  try {
    // Buscar el usuario por cédula
    const user = await prisma.user.findUnique({
      where: { cedula },
      include: {
        Card: {
          include: {
            securityCode: true,
          },
        },
      },
    })

    // Si no se encuentra el usuario o no tiene tarjeta
    if (!user || !user.Card || user.Card.length === 0) {
      return (
        <div className="container mx-auto p-6 max-w-md">
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">
              {' '}
              Usuario o tarjeta no encontrada.
            </span>
          </div>
        </div>
      )
    }

    // Verificar el código de seguridad
    const card = user.Card.find(
      (card) => card.securityCode && card.securityCode.code === securityCode
    )

    if (!card) {
      return (
        <div className="container mx-auto p-6 max-w-md">
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">
              {' '}
              Código de seguridad inválido.
            </span>
          </div>
        </div>
      )
    }

    // Actualizar el contador de uso y la última fecha de uso
    await prisma.securityCode.update({
      where: { id: card.securityCode!.id },
      data: {
        usedCount: { increment: 1 },
        lastUsedAt: new Date(),
      },
    })

    // Extraer los datos de la tarjeta
    const cardData = card.data as any

    return (
      <MedicalCard
        user={user}
        diseases={cardData.diseases || []}
        medications={cardData.medications || []}
        securityCode={card.securityCode!.code}
        usedCount={card.securityCode!.usedCount + 1}
      />
    )
  } catch (error) {
    console.error('Error al cargar la tarjeta médica:', error)
    return (
      <div className="container mx-auto p-6 max-w-md">
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">
            {' '}
            Ocurrió un error al cargar la tarjeta médica.
          </span>
        </div>
      </div>
    )
  }
}
