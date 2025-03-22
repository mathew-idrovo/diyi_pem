import type { User } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Phone, Mail, UserIcon, Clock } from 'lucide-react'

interface MedicalCardProps {
  user: User
  diseases: string[]
  medications: string[]
  securityCode: string
  usedCount: number
}

export function MedicalCard({
  user,
  diseases,
  medications,
  securityCode,
  usedCount,
}: MedicalCardProps) {
  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="w-full">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl flex items-center justify-between">
            <span>Tarjeta Médica</span>
            <Badge variant="secondary" className="ml-2">
              #{securityCode}
            </Badge>
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Información médica de emergencia
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center">
              <UserIcon className="mr-2 h-5 w-5" />
              Información Personal
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-medium">Nombre:</div>
              <div className="col-span-2">{user.name}</div>

              <div className="font-medium">Cédula:</div>
              <div className="col-span-2">{user.cedula}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
              Condiciones Médicas
            </h3>
            <div className="flex flex-wrap gap-2">
              {diseases.map((disease, index) => (
                <Badge key={index} variant="destructive">
                  {disease}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Medicamentos</h3>
            <div className="flex flex-wrap gap-2">
              {medications.map((medication, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50">
                  {medication}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-1">
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4 text-sm text-muted-foreground flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          <span>
            Visto {usedCount} {usedCount === 1 ? 'vez' : 'veces'}
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
