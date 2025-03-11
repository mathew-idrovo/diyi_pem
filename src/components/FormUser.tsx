'use client'
import clsx from 'clsx'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { registerClients } from '@/actions/register'
import { logout } from '@/actions'
import { IoLogOutOutline } from 'react-icons/io5'
import { generateVerificationToken } from '@/actions/verification'

type FormInputs = {
  name: string
  email: string
  phone: string
  cedula: string
}

export const FormUser = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
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

      // 3️⃣ Redirigir después de enviar el correo
      window.location.replace('/dashboard')
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {errors.name?.type === 'required' && (
        <span className="text-red-500">* El nombre es obligatorio</span>
      )}

      <label htmlFor="name">Nombre completo</label>
      <input
        id="name"
        className={clsx(
          'px-5 py-2 border rounded mb-5 text-black placeholder-gray-500',
          'bg-white dark:bg-gray-800 dark:text-white border-gray-300',
          {
            'border-red-500': errors.name,
          }
        )}
        type="text"
        autoFocus
        {...register('name', { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        id="email"
        className={clsx(
          'px-5 py-2 border rounded mb-5 text-black placeholder-gray-500',
          'bg-white dark:bg-gray-800 dark:text-white border-gray-300',
          {
            'border-red-500': errors.email,
          }
        )}
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="phone">Telefono</label>
      <input
        id="phone"
        className={clsx(
          'px-5 py-2 border rounded mb-5 text-black placeholder-gray-500',
          'bg-white dark:bg-gray-800 dark:text-white border-gray-300',
          {
            'border-red-500': errors.phone,
          }
        )}
        type="text"
        placeholder="Ej: +1 555 123 4567"
        {...register('phone', {
          required: true,
          pattern: /^[0-9+\-\s()]+$/,
        })}
      />

      <label htmlFor="cedula">Cédula</label>
      <input
        id="cedula"
        className={clsx(
          'px-5 py-2 border rounded mb-5 text-black placeholder-gray-500',
          'bg-white dark:bg-gray-800 dark:text-white border-gray-300',
          {
            'border-red-500': errors.cedula,
          }
        )}
        type="text"
        placeholder="Ej: 123456789"
        {...register('cedula', {
          required: true,
          minLength: 6,
          pattern: /^[0-9]+$/, // Only allows numbers
        })}
      />

      {errorMessage && (
        <span className="text-red-500 mb-3">{errorMessage}</span>
      )}

      <button
        type="submit"
        className={clsx('btn-primary', {
          'opacity-50 cursor-not-allowed': isLoading,
        })}
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : 'Crear Cliente'}
      </button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      <button
        className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        onClick={() => logout()}
      >
        <IoLogOutOutline size={30} />
        <span className="ml-3 text-xl">Salir</span>
      </button>
    </form>
  )
}
