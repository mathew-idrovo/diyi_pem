'use client'
import Link from 'next/link'
import clsx from 'clsx'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { registerClients } from '@/actions/register'

type FormInputs = {
  name: string
  email: string
  phone: string
  cedula: string
}

export const FormUser = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { name, email, phone, cedula } = data

    // Server action
    const resp = await registerClients(name, email, phone, cedula)

    if (!resp.ok) {
      setErrorMessage(resp.message)
      return
    }

    window.location.replace('/diyi')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {errors.name?.type === 'required' && (
        <span className="text-red-500">* El nombre es obligatorio</span>
      )}

      <label htmlFor="email">Nombre completo</label>
      <input
        className={clsx(
          'px-5 py-2 border rounded mb-5 text-black placeholder-gray-500',
          'bg-white dark:bg-gray-800 dark:text-white border-gray-300 ',
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
        className={clsx(
          'px-5 py-2 border rounded mb-5 text-black placeholder-gray-500',
          'bg-white dark:bg-gray-800 dark:text-white border-gray-300 ',
          {
            'border-red-500': errors.email,
          }
        )}
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      <label htmlFor="phone">Telefono</label>
      <input
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
          pattern: /^[0-9]+$/, // ✅ Solo permite números
        })}
      />

      <span className="text-red-500">{errorMessage} </span>

      <button className="btn-primary">Crear Cliente</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
    </form>
  )
}
