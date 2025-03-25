'use client'
import clsx from 'clsx'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { registerClients } from '@/actions/register'
import { logout } from '@/actions'
import { IoLogOutOutline } from 'react-icons/io5'
import { generateVerificationToken } from '@/actions/verification'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type FormInputs = {
  name: string
  email: string
  phone: string
  cedula: string
}
interface FormUserProps {
  onSuccess: () => void
}

export const FormUser = ({ onSuccess }: FormUserProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    setSuccessMessage('')
    setIsLoading(true)
    const { name, email, phone, cedula } = data

    try {
      // Server action to register client
      const resp = await registerClients(name, email, phone, cedula)

      if (!resp.ok) {
        throw new Error(resp.message || 'Error registering client')
      }

      // Send email using the API
      const emailResponse = await generateVerificationToken(email)

      if (!emailResponse.message) {
        throw new Error(emailResponse.message || 'Error enviando email')
      }
      setSuccessMessage('Cliente registrado y correo enviado correctamente')
      reset()
      // 3️⃣ Redirigir después de enviar el correo
      window.location.replace('/dashboard')
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-300">
          Nombre completo
        </label>
        <input
          id="name"
          className={clsx(
            'w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all',
            {
              'border-red-500 focus:ring-red-500/25': errors.name,
              'border-gray-600': !errors.name,
            }
          )}
          type="text"
          autoFocus
          {...register('name', { required: true })}
        />
        {errors.name?.type === 'required' && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            El nombre es obligatorio
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">
          Correo electrónico
        </label>
        <input
          id="email"
          className={clsx(
            'w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all',
            {
              'border-red-500 focus:ring-red-500/25': errors.email,
              'border-gray-600': !errors.email,
            }
          )}
          type="email"
          autoFocus
          {...register('email', { required: true })}
        />
        {errors.email?.type === 'required' && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            El correo es obligatorio
          </p>
        )}
        {errors.email?.type === 'pattern' && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Formato de correo inválido
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-300">
          Teléfono
        </label>
        <input
          id="phone"
          className={clsx(
            'w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all',
            {
              'border-red-500 focus:ring-red-500/25': errors.phone,
              'border-gray-600': !errors.phone,
            }
          )}
          type="text"
          placeholder="Ej: +593 987 406 612"
          autoFocus
          {...register('phone', {
            required: true,
            pattern: /^[0-9+\-\s()]+$/,
          })}
        />
        {errors.phone?.type === 'required' && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            El teléfono es obligatorio
          </p>
        )}
        {errors.phone?.type === 'pattern' && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Formato de teléfono inválido
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="cedula" className="text-sm font-medium text-gray-300">
          Cédula
        </label>
        <input
          id="cedula"
          className={clsx(
            'w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all',
            {
              'border-red-500 focus:ring-red-500/25': errors.cedula,
              'border-gray-600': !errors.cedula,
            }
          )}
          type="text"
          autoFocus
          placeholder="Ej: 1213456789"
          {...register('cedula', {
            required: true,
            minLength: 6,
            pattern: /^[0-9]+$/, // Only allows numbers
          })}
        />
        {errors.cedula?.type === 'required' && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            La cédula es obligatoria
          </p>
        )}
        {errors.cedula?.type === 'minLength' && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            La cédula debe tener al menos 6 dígitos
          </p>
        )}
        {errors.cedula?.type === 'pattern' && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            La cédula debe contener solo números
          </p>
        )}
      </div>
      {errorMessage && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}
      <div className="flex justify-end space-x-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isLoading}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Limpiar
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            'Crear Cliente'
          )}
        </Button>
      </div>
    </form>
  )
}
