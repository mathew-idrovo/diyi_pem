'use client'

import { authenticate } from '@/actions/auth/login'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useActionState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { IoInformationOutline, IoLogInOutline } from 'react-icons/io5'

export const FormLogin = () => {
  const [state, dispatch] = useActionState(authenticate, undefined)

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/dashboard')
    }
  }, [state])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-md backdrop-blur-md bg-black/30 p-8 rounded-xl border border-gray-800 shadow-2xl">
        <div className="flex items-center justify-center mb-8">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
            <IoLogInOutline className="h-7 w-7 text-black" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Iniciar sesión
        </h2>

        <form action={dispatch} className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-300 font-medium block">
              Correo electrónico
            </label>
            <input
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all"
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-gray-300 font-medium block"
            >
              Contraseña
            </label>
            <input
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all"
              type="password"
              name="password"
              placeholder="••••••••"
            />
          </div>

          {state === 'CredentialsSignin' && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-md">
              <IoInformationOutline className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">Las credenciales no son correctas</p>
            </div>
          )}

          <LoginButton />

          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-gray-700"></div>
            <div className="px-3 text-gray-500 text-sm">O</div>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <p className="text-center text-gray-400 text-sm">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="text-white hover:underline transition-all">
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={clsx('w-full py-3 rounded-md font-medium transition-all', {
        'bg-white text-black hover:bg-gray-200': !pending,
        'bg-gray-600 text-gray-300 cursor-not-allowed': pending,
      })}
      disabled={pending}
    >
      {pending ? 'Procesando...' : 'Ingresar'}
    </button>
  )
}
